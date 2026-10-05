import {useEffect,useRef} from 'react';import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const FLOWS=[{t:'Application flow',n:['React / Vite','REST API','Node.js + Express','Controllers','MongoDB']},{t:'AI flow',n:['Frontend','Gemini API','AI-powered assistance']}];
export default function Architecture(){
 const r=useRef();
 useEffect(()=>{const st=ScrollTrigger.create({trigger:r.current,start:'top 75%',once:true,onEnter:()=>{
  r.current.classList.add('live');gsap.from('.arch-node',{opacity:0,y:30,stagger:.18,duration:.7,ease:'power3.out'});}});return()=>st.kill();},[]);
 return(<section id="architecture" ref={r} className="sec"><p className="tag">System Architecture</p><h2 className="big">How SehatSaarthi talks.</h2>
 <div className="arch">{FLOWS.map(f=><div key={f.t} className="flow"><small>{f.t}</small>{f.n.map((x,i)=><div key={x} className="flow-step">
  {i>0&&<span className="arch-link"><i/></span>}<div className="arch-node">{x}</div></div>)}</div>)}</div></section>);
}
