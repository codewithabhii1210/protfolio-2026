import {useEffect,useState,lazy,Suspense} from 'react';import Intro from './components/Intro';import Cursor from './components/Cursor';import Nav from './components/Nav';import Marquee from './components/Marquee';
import Hero from './sections/Hero';import Project from './sections/Project';import Contact from './sections/Contact';
import {About,Stack,MoreWork,Achievements,Beyond,Education,Certification} from './sections/Info';import Journey from './sections/Journey';
import {initSmoothScroll} from './animations/smoothScroll';import {initInteractions} from './hooks/interactions';
const Admin=lazy(()=>import('./pages/Admin'));const Architecture=lazy(()=>import('./sections/Architecture'));
export default function App(){
 const admin=location.pathname.startsWith('/admin'),[ready,setReady]=useState(false);
 useEffect(()=>{if(admin)return;const a=initSmoothScroll(),b=initInteractions();return()=>{a();b();};},[]);
 if(admin)return <Suspense fallback={null}><Admin/></Suspense>;
 return(<><Intro onDone={()=>setReady(true)}/><Cursor/><Nav/><main><Hero ready={ready}/><Marquee/><About/><Stack/><Project/>
  <Suspense fallback={<div style={{minHeight:700}}/>}><Architecture/></Suspense><MoreWork/><Journey/><Achievements/><Beyond/><Education/><Certification/><Contact/></main></>);
}
