function pick(camera,callback) {
  const input=document.createElement('input');
  input.type='file';
  input.accept='image/jpeg,image/png,image/webp';
  input.setAttribute('aria-label',camera?'촬영할 사진 선택':'분석할 식물 사진 선택');
  if (camera) input.setAttribute('capture','environment');
  input.onchange=()=>{
    const file=input.files?.[0];
    if (!file) return callback({didCancel:true});
    const reader=new FileReader();
    reader.onload=()=>callback({assets:[{uri:reader.result,fileName:file.name,type:file.type}]});
    reader.readAsDataURL(file);
  };
  input.oncancel=()=>callback({didCancel:true});
  input.click();
}
export const launchCamera=(_options,callback)=>pick(true,callback);
export const launchImageLibrary=(_options,callback)=>pick(false,callback);
