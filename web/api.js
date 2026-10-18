// Development-only browser adapter. Model credentials are added by the loopback proxy.
export async function predictDiseaseApi(imageUri,species='') {
  const photo=await fetch(imageUri).then(response=>response.blob());
  const body=new FormData();
  body.append('image',photo,'leaf.'+(photo.type==='image/webp'?'webp':photo.type==='image/png'?'png':'jpg'));
  body.append('species',species);
  const response=await fetch('/model-api/predict',{method:'POST',body,signal:AbortSignal.timeout(105000)});
  const data=await response.json();
  if (!response.ok) {
    const error=new Error(data.detail || '사진 분석 요청을 처리하지 못했습니다.');
    error.response={data:{disease_symptom:data.detail || error.message}};
    throw error;
  }
  return data;
}
