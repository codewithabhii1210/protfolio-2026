import {useEffect,useRef} from 'react';import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export default function Counter({to,suffix='',label}){
 const r=useRef();
 useEffect(()=>{const o={v:0};
  const st=ScrollTrigger.create({trigger:r.current,start:'top 92%',once:true,onEnter:()=>gsap.to(o,{v:to,duration:1.6,ease:'power2.out',onUpdate:()=>{r.current.textContent=Math.round(o.v)+suffix}})});
  return()=>st.kill();},[]);
 return <div className="stat" data-reveal><b ref={r}>0{suffix}</b><small>{label}</small></div>;
}
