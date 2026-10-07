import {useEffect,useRef,useState,lazy,Suspense} from 'react';import gsap from 'gsap';import Profile from '../components/Profile';
const Hero3D=lazy(()=>import('../components/Hero3D'));
const ROLES=['Full-Stack Developer.','Problem Solver.','Creative Developer.'];
export default function Hero({ready}){
 const r=useRef(),[i,setI]=useState(0);
 useEffect(()=>{const t=setInterval(()=>setI(v=>(v+1)%ROLES.length),2400);return()=>clearInterval(t);},[]);
 useEffect(()=>{if(!ready)return;
  const c=gsap.context(()=>{gsap.timeline().from('.h-line span',{yPercent:110,duration:1.1,ease:'power4.out',stagger:.12})
   .from('.h-fade',{y:24,opacity:0,duration:.8,stagger:.1,ease:'power3.out'},'-=.6').from('.photo,.hero3d',{opacity:0,scale:.85,duration:1.2,ease:'power3.out'},.2);},r);
  return()=>c.revert();},[ready]);
 return(<section ref={r} className="hero" id="top"><div className="hero-copy">
  <p className="h-fade tag"><b className="dot"/>Available for opportunities</p>
  <h1><span className="h-line"><span>Computer Science Student</span></span><span className="h-line"><span>Building Digital Experiences.</span></span></h1>
  <p className="h-fade role" aria-live="polite"><span key={i}>{ROLES[i]}</span></p>
  <p className="h-fade lead">Hi, I'm Abhi. Computer Science undergraduate focused on building modern web applications, solving problems and continuously improving my development skills.</p>
  <div className="h-fade row"><a data-mag className="btn primary" href="#work">View My Work</a><a data-mag className="btn" href="#contact">Let's Connect</a></div></div>
  <div className="hero-visual">{ready&&<Suspense fallback={null}><Hero3D/></Suspense>}<Profile/></div></section>);
}
