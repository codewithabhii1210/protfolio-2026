import {useEffect,useRef,useState} from 'react';import gsap from 'gsap';import {CONFIG} from '../config';
// Profile photo disc: spinning ring, mouse parallax, tilt (data-tilt), sheen on hover. Falls back to initials.
export default function Profile(){
 const [ok,setOk]=useState(true),img=useRef();
 useEffect(()=>{
  if(!matchMedia('(hover:hover) and (pointer:fine)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches||!img.current)return;
  gsap.set(img.current,{scale:1.15});
  const x=gsap.quickTo(img.current,'x',{duration:.8}),y=gsap.quickTo(img.current,'y',{duration:.8});
  const mv=e=>{x((e.clientX/innerWidth-.5)*-18);y((e.clientY/innerHeight-.5)*-18);};
  addEventListener('pointermove',mv);return()=>removeEventListener('pointermove',mv);
 },[ok]);
 return(<div className="photo" data-tilt><span className="halo"/><div className="disc">
  {ok?<img ref={img} src={CONFIG.photo} alt="Abhishek Singh" width="460" height="460" decoding="async" fetchpriority="high" onError={()=>setOk(false)}/>:<span className="initials" aria-hidden="true">AS</span>}
  <i className="sheen"/></div></div>);
}
