import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import DiseasePredict from '../src/screens/DiseasePredict';
import DiseaseResult from '../src/screens/DiseaseResult';
import './style.css';

const species=[['Monstera','몬스테라'],['Pothos','스킨답서스'],['SnakePlant','산세베리아'],['SpiderPlant','접란'],['AloeVera','알로에'],['Opuntia','백년초'],['Tomato','토마토'],['Pepper,_bell','피망'],['Strawberry','딸기']];
function App() {
  const [selected,setSelected]=useState('Monstera');
  const [screen,setScreen]=useState('DiseasePredict');
  const [params,setParams]=useState({});
  const [health,setHealth]=useState(null);
  const [session,setSession]=useState(0);
  const plant={id:'web-preview',species:selected,name:species.find(([id])=>id===selected)[1]};
  const update=()=>fetch('/preview-status').then(r=>r.json()).then(setHealth).catch(()=>setHealth({checks:[]}));
  useEffect(()=>{update();},[]);
  const navigation={
    replace:(name,next)=>{setParams(next || {});setScreen(name==='DiseaseResult'?name:'DiseasePredict');},
    goBack:()=>setScreen('DiseasePredict'),
    navigate:()=>setScreen('DiseasePredict'),
  };
  return <main className="shell">
    <aside className="side">
      <div className="brand">🌿 Pocket Plant</div>
      <h1>질병 예측 실행</h1>
      <p className="subtle">실제 모델 연결 · 개발용 웹 실행</p>
      <label htmlFor="species">분석할 식물</label>
      <select id="species" value={selected} onChange={event=>{setSelected(event.target.value);setScreen('DiseasePredict');setParams({});}}>
        {species.map(([id,name])=><option key={id} value={id}>{name}</option>)}
      </select>
      <button className="reset" onClick={()=>{setScreen('DiseasePredict');setParams({});setSession(value=>value+1);}}>새 사진 분석</button>
      <section className="status-card">
        <h2>서버 연결 상태</h2>
        {health?.checks?.map(check=><div className="status-row" key={check.name}><span>{check.name}</span><strong className={check.ok?'online':'offline'}>{check.ok?([401,403].includes(check.status)?'로그인 필요':'연결됨'):'확인 필요'}</strong></div>)}
        {!health && <p>연결 확인 중…</p>}
        <button className="refresh" onClick={update}>연결 다시 확인</button>
      </section>
      <p className="note">사진을 올리고 진단하기를 눌러 주세요. 결과는 병명·장해 후보와 추가 확인 항목을 제공합니다.</p>
      <p className="subtle">증상 메모는 기록용이며 현재 모델 입력에는 포함되지 않습니다.</p>
    </aside>
    <section className="phone" aria-label="식물 질병 예측 앱 실행 화면">
      <div className="phone-top"><span>Pocket Plant</span><span>{plant.name}</span></div>
      <div className="app-content">
        {screen==='DiseaseResult'
          ? <DiseaseResult navigation={navigation} route={{params:{...params,plant}}}/>
          : <DiseasePredict key={selected+session} navigation={navigation} route={{params:{plant}}}/>}
      </div>
    </section>
  </main>;
}
createRoot(document.getElementById('root')).render(<App/>);
