import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
// Global: scroll reveal [data-reveal], magnetic [data-mag], 3D tilt [data-tilt]
export function initInteractions(){
 const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const off=[];
 if(!reduce){
  gsap.set('[data-reveal]',{opacity:0,y:40});
  ScrollTrigger.batch('[data-reveal]',{start:'top 90%',once:true,
   onEnter:els=>gsap.to(els,{y:0,opacity:1,duration:.8,stagger:.08,ease:'power3.out'})});
 }
 if(fine&&!reduce){
  const bind=(sel,move,leave)=>document.querySelectorAll(sel).forEach(el=>{
   const m=e=>move(el,e,el.getBoundingClientRect()),l=()=>leave(el);
   el.addEventListener('pointermove',m);el.addEventListener('pointerleave',l);
   off.push(()=>{el.removeEventListener('pointermove',m);el.removeEventListener('pointerleave',l)});});
  bind('[data-mag]',(el,e,b)=>gsap.to(el,{x:(e.clientX-b.left-b.width/2)*.3,y:(e.clientY-b.top-b.height/2)*.3,duration:.4}),
   el=>gsap.to(el,{x:0,y:0,duration:.7,ease:'elastic.out(1,.4)'}));
  bind('[data-tilt]',(el,e,b)=>gsap.to(el,{transformPerspective:800,rotateY:((e.clientX-b.left)/b.width-.5)*10,rotateX:-((e.clientY-b.top)/b.height-.5)*10,duration:.4}),
   el=>gsap.to(el,{rotateX:0,rotateY:0,duration:.6}));
 }
 if(fine){const sp=e=>{const c=e.target.closest&&e.target.closest('.card');if(c){const b=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-b.left+'px');c.style.setProperty('--my',e.clientY-b.top+'px');}};
  document.addEventListener('pointermove',sp);off.push(()=>document.removeEventListener('pointermove',sp));}
 const rf=()=>ScrollTrigger.refresh();addEventListener('load',rf);
 return()=>{off.forEach(f=>f());removeEventListener('load',rf);ScrollTrigger.getAll().forEach(t=>t.kill());};
}
