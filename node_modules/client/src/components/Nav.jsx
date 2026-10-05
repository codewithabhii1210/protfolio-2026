import {useEffect,useRef} from 'react';
const L=[['About','#about'],['Stack','#stack'],['Work','#work'],['Journey','#journey'],['Education','#education'],['Contact','#contact']];
// Nav with scroll-progress bar; hides when scrolling down, returns when scrolling up
export default function Nav(){
 const bar=useRef(),nav=useRef();
 useEffect(()=>{let last=0;const f=()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
  bar.current.style.transform=`scaleX(${h>0?y/h:0})`;nav.current.classList.toggle('hide',y>last&&y>200);last=y;};
  addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f);},[]);
 return(<header ref={nav} className="nav"><span ref={bar} className="progress"/><a href="#top" className="logo" aria-label="Home">AS</a>
  <nav aria-label="Primary">{L.map(([t,h])=><a key={h} href={h}>{t}</a>)}</nav></header>);
}
