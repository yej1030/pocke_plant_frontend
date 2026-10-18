import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import {readFileSync, existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig(({mode}) => {
  const env = {...loadEnv(mode, root, 'PLANT_'), ...process.env};
  const modelUrl = env.PLANT_MODEL_URL || 'http://127.0.0.1:8765';
  const token = env.PLANT_MODEL_API_TOKEN || (env.PLANT_MODEL_API_TOKEN_FILE && existsSync(env.PLANT_MODEL_API_TOKEN_FILE)
    ? readFileSync(env.PLANT_MODEL_API_TOKEN_FILE,'utf8').trim() : '');
  return {
    plugins: [react(), {
      name:'native-assets-for-web',
      transform(code, id) {
        if (!id.includes('/src/') || !/\.[jt]sx?$/.test(id)) return;
        return code.replace(/require\((['"])([^'"]+\.(?:png|jpe?g|webp))\1\)/g,
          (_, quote, asset) => `({uri:new URL(${JSON.stringify(asset)},import.meta.url).href})`);
      },
      configureServer(server) {
        server.middlewares.use('/preview-status',async (_req,res) => {
          const check = async (name,url,needsToken=true) => {
            try {
              const response=await fetch(url,{headers:needsToken?{'X-Model-Token':token,'User-Agent':'PocketPlant-Preview/1.0'}:{},signal:AbortSignal.timeout(10000)});
              return {name,status:response.status,ok:needsToken?response.ok:[200,401,403,405].includes(response.status)};
            } catch { return {name,status:0,ok:false}; }
          };
          const checks=await Promise.all([
            check('PC 모델',env.PLANT_LOCAL_MODEL_URL || 'http://127.0.0.1:8765/health'),
            check('Cloudflare 연결',modelUrl.replace(/\/$/,'')+'/health'),
            check('AWS 백엔드',(env.PLANT_AWS_URL || 'http://3.25.69.13:8080')+'/api/disease/predict',false),
          ]);
          res.setHeader('Content-Type','application/json; charset=utf-8');
          res.setHeader('Cache-Control','no-store');
          res.end(JSON.stringify({checks,checkedAt:new Date().toISOString()}));
        });
      },
    }],
    resolve:{
      alias:[
        {find:/^react-native$/,replacement:'react-native-web'},
        {find:/^@tabler\/icons-react-native\/IconCameraPlus$/,replacement:path.join(root,'web/camera-icon.jsx')},
        {find:/^@tabler\/icons-react-native\/IconX$/,replacement:path.join(root,'web/close-icon.jsx')},
        {find:/^react-native-image-picker$/,replacement:path.join(root,'web/image-picker.js')},
        {find:/^\.\.\/api\/api$/,replacement:path.join(root,'web/api.js')},
      ],
      extensions:['.web.js','.web.jsx','.web.ts','.web.tsx','.mjs','.js','.jsx','.ts','.tsx','.json'],
    },
    define:{__DEV__:true,global:'globalThis'},
    server:{host:'127.0.0.1',port:5173,strictPort:true,proxy:{
      '/model-api':{
        target:modelUrl,changeOrigin:true,rewrite:value=>value.replace(/^\/model-api/,''),
        configure(proxy){proxy.on('proxyReq',request=>{
          request.setHeader('X-Model-Token',token);
          request.setHeader('User-Agent','PocketPlant-Preview/1.0');
        });},
      },
    }},
    build:{outDir:'dist-web'},
  };
});
