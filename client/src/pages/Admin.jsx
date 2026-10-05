import {useEffect,useState} from 'react';import * as api from '../services/api';
const EMPTY={title:'',description:'',technologies:'',githubUrl:'',liveUrl:'',year:new Date().getFullYear(),featured:false,image:''};
export default function Admin(){
 const [authed,setAuthed]=useState(api.hasToken()),[err,setErr]=useState(''),[projects,setP]=useState([]),[msgs,setM]=useState([]),[f,setF]=useState(EMPTY);
 const load=async()=>{try{setP(await api.getProjects());setM(await api.getMessages());}catch(e){if(/token|Unauthorized/i.test(e.message)){api.logout();setAuthed(false);}else setErr(e.message);}};
 useEffect(()=>{if(authed)load();},[authed]);
 const doLogin=async e=>{e.preventDefault();const d=new FormData(e.target);try{await api.login(d.get('email'),d.get('password'));setErr('');setAuthed(true);}catch(x){setErr(x.message);}};
 const up=k=>e=>setF({...f,[k]:e.target.type==='checkbox'?e.target.checked:e.target.value});
 const save=async e=>{e.preventDefault();try{await api.saveProject({...f,technologies:String(f.technologies).split(',').map(s=>s.trim()).filter(Boolean)});setF(EMPTY);setErr('');load();}catch(x){setErr(x.message);}};
 const upload=async e=>{const file=e.target.files[0];if(!file)return;try{const r=await api.uploadImage(file);setF(v=>({...v,image:r.url}));}catch(x){setErr(x.message);}};
 const edit=p=>setF({...p,technologies:(p.technologies||[]).join(', ')});
 const del=async id=>{if(confirm('Delete project?')){try{await api.deleteProject(id);load();}catch(x){setErr(x.message);}}};
 if(!authed)return(<div className="admin"><form className="form" onSubmit={doLogin}><h2>Admin login</h2><input name="email" type="email" placeholder="Email" required/><input name="password" type="password" placeholder="Password" required/><button className="btn primary">Login</button><p>{err}</p></form></div>);
 return(<div className="admin"><header className="row"><h2>Admin</h2><button className="btn" onClick={()=>{api.logout();setAuthed(false);}}>Logout</button><a className="btn" href="/">Site</a></header><p role="alert">{err}</p>
 <form className="form" onSubmit={save}><h3>{f._id?'Edit':'Add'} project</h3>
  <input placeholder="Title" value={f.title} onChange={up('title')} required/><textarea placeholder="Description" rows="3" value={f.description} onChange={up('description')}/>
  <input placeholder="Technologies (comma separated)" value={f.technologies} onChange={up('technologies')}/><input placeholder="GitHub URL" value={f.githubUrl} onChange={up('githubUrl')}/>
  <input placeholder="Live URL" value={f.liveUrl} onChange={up('liveUrl')}/><input type="number" placeholder="Year" value={f.year} onChange={up('year')}/>
  <label><input type="checkbox" checked={!!f.featured} onChange={up('featured')}/> Featured</label>
  <input type="file" accept="image/*" onChange={upload}/>{f.image&&<img src={f.image} alt="" width="160"/>}
  <div className="row"><button className="btn primary">Save</button>{f._id&&<button type="button" className="btn" onClick={()=>setF(EMPTY)}>Cancel</button>}</div></form>
 <h3>Projects</h3>{projects.map(p=><div key={p._id} className="card row"><b>{p.title}</b><span>{p.year}</span><button className="btn" onClick={()=>edit(p)}>Edit</button><button className="btn" onClick={()=>del(p._id)}>Delete</button></div>)}
 <h3>Messages</h3>{msgs.map(m=><div key={m._id} className="card"><b>{m.name}</b> · {m.email}<p>{m.message}</p><small>{new Date(m.createdAt).toLocaleString()}</small></div>)}</div>);
}
