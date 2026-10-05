import {useEffect,useRef} from 'react';import gsap from 'gsap';
export default function Cursor(){
 const d=useRef(),t=useRef();
 useEffect(()=>{
  if(!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
  const x=gsap.quickTo(d.current,'x',{duration:.25,ease:'power3'}),y=gsap.quickTo(d.current,'y',{duration:.25,ease:'power3'});
  const mv=e=>{x(e.clientX);y(e.clientY)};
  const over=e=>{const el=e.target.closest('[data-cursor],a,button,input,textarea');const k=el?(el.dataset.cursor||'link'):'';
   d.current.dataset.state=k;t.current.textContent=k==='view'?'VIEW':'';};
  addEventListener('pointermove',mv);addEventListener('pointerover',over);
  return()=>{removeEventListener('pointermove',mv);removeEventListener('pointerover',over);};
 },[]);
 return <div ref={d} className="cursor" aria-hidden="true"><span ref={t}/></div>;
}
