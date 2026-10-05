import {useEffect,useRef} from 'react';import gsap from 'gsap';
// Loader: progress ring + % counter in the centre, name below, then two curtains split open to reveal the hero
export default function Intro({onDone}){
 const root=useRef(),num=useRef(),bar=useRef();
 useEffect(()=>{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){root.current.style.display='none';onDone();return;}
  document.body.style.overflow='hidden';const c={v:0};
  const tl=gsap.timeline({onComplete:()=>{document.body.style.overflow='';root.current.style.display='none';}});
  tl.from('.loader',{scale:.85,opacity:0,duration:.6,ease:'power3.out'})
   .from('.intro-name span',{yPercent:110,duration:.7,stagger:.06,ease:'power3.out'},.3)
   .to(c,{v:100,duration:2.2,ease:'power2.inOut',onUpdate:()=>{num.current.textContent=Math.round(c.v);bar.current.style.strokeDashoffset=100-c.v;}},.2)
   .to('.loader',{scale:.7,opacity:0,duration:.5,ease:'power3.in'},'+=.15')
   .to('.intro-name span',{yPercent:-110,duration:.4,stagger:.03},'<')
   .addLabel('open')
   .to('.curtain.top',{yPercent:-100,duration:1,ease:'expo.inOut'},'open')
   .to('.curtain.bot',{yPercent:100,duration:1,ease:'expo.inOut'},'open')
   .call(onDone,null,'open+=.35');
  return()=>{tl.kill();document.body.style.overflow='';};
 },[]);
 return(<div ref={root} className="intro" aria-hidden="true"><div className="curtain top"/><div className="curtain bot"/>
  <div className="loader"><svg viewBox="0 0 120 120"><circle className="trk" cx="60" cy="60" r="54"/><circle ref={bar} className="bar" cx="60" cy="60" r="54" pathLength="100"/></svg>
   <i className="orbit"/><p className="pct"><span ref={num}>0</span><small>%</small></p></div>
  <p className="intro-name">{'ABHI SINGH'.split('').map((ch,i)=><i key={i}><span>{ch===' '?'\u00a0':ch}</span></i>)}</p></div>);
}
