import {existsSync,readFileSync} from 'node:fs';
import {execFileSync,spawn} from 'node:child_process';
import path from 'node:path';

const settings=existsSync('.env.local')?Object.fromEntries(readFileSync('.env.local','utf8').split(/\r?\n/).filter(line=>line && !line.startsWith('#') && line.includes('=')).map(line=>{const index=line.indexOf('=');return [line.slice(0,index),line.slice(index+1)];})):{};
const sdk=process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
const adb=process.env.ADB_PATH || settings.ADB_PATH || (sdk?path.join(sdk,'platform-tools',process.platform==='win32'?'adb.exe':'adb'):'adb');
const output=execFileSync(adb,['devices'],{encoding:'utf8'});
const devices=output.split(/\r?\n/).map(line=>line.trim().split(/\s+/)).filter(row=>row[1]==='device');
if (devices.length!==1) throw Error('USB 디버깅을 허용한 안드로이드 휴대폰을 한 대 연결해 주세요.');
const serial=devices[0][0];
const command=(...args)=>execFileSync(adb,['-s',serial,...args],{stdio:'inherit'});
let ready=false;
try {ready=(await fetch('http://127.0.0.1:8081/status',{signal:AbortSignal.timeout(1500)}).then(r=>r.text())).includes('packager-status:running');} catch {}
let metro;
if (!ready) {
  metro=spawn(process.execPath,[path.resolve('node_modules/react-native/cli.js'),'start','--port','8081'],{stdio:'inherit',env:process.env});
  for (let attempt=0;attempt<60;attempt++) {
    await new Promise(resolve=>setTimeout(resolve,500));
    try {ready=(await fetch('http://127.0.0.1:8081/status',{signal:AbortSignal.timeout(1000)}).then(r=>r.text())).includes('packager-status:running');} catch {}
    if (ready) break;
  }
}
if (!ready) throw Error('Metro 개발 서버를 시작하지 못했습니다.');
command('reverse','tcp:8081','tcp:8081');
command('shell','am','start','-n','com.pocketplants/.MainActivity');
console.log('연결된 휴대폰에서 Pocket Plant를 실행했습니다. 이 PC의 수정된 화면 코드를 사용합니다.');
console.log('네이티브 라이브러리를 바꿨다면 먼저 npm run android로 APK를 다시 빌드해야 합니다.');
if (metro) process.on('SIGINT',()=>{metro.kill('SIGINT');process.exit(0);});
