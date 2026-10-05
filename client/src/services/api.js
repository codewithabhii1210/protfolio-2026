let token=sessionStorage.getItem('t');
const req=async(path,opts={},auth)=>{
 const h={...(opts.body instanceof FormData?{}:{'Content-Type':'application/json'}),...(auth&&token?{Authorization:'Bearer '+token}:{})};
 const r=await fetch('/api'+path,{...opts,headers:h});const j=await r.json().catch(()=>({}));
 if(!r.ok)throw new Error(j.message||'Request failed');return j;};
export const sendContact=d=>req('/contact',{method:'POST',body:JSON.stringify(d)});
export const login=async(email,password)=>{const j=await req('/auth/login',{method:'POST',body:JSON.stringify({email,password})});token=j.token;sessionStorage.setItem('t',token);return j;};
export const logout=()=>{token=null;sessionStorage.removeItem('t');};
export const hasToken=()=>!!token;
export const getProjects=()=>req('/projects');
export const saveProject=p=>p._id?req('/projects/'+p._id,{method:'PUT',body:JSON.stringify(p)},1):req('/projects',{method:'POST',body:JSON.stringify(p)},1);
export const deleteProject=id=>req('/projects/'+id,{method:'DELETE'},1);
export const getMessages=()=>req('/contact',{},1);
export const uploadImage=f=>{const fd=new FormData();fd.append('image',f);return req('/upload',{method:'POST',body:fd},1);};
