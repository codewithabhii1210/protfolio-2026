import {useEffect,useRef,useState} from 'react';
const L=[['About','#about'],['Stack','#stack'],['Work','#work'],['Journey','#journey'],['Education','#education'],['Contact','#contact']];
// Nav with scroll-progress bar; hides when scrolling down, returns when scrolling up
export default function Nav(){
 const bar=useRef(),nav=useRef();
 const [menuOpen,setMenuOpen]=useState(false);
 useEffect(()=>{let last=0;const f=()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
  bar.current.style.transform=`scaleX(${h>0?y/h:0})`;nav.current.classList.toggle('hide',y>last&&y>200&&!menuOpen);last=y;};
  addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f);},[menuOpen]);
 const closeMenu=()=>setMenuOpen(false);
 return(<header ref={nav} className={`nav ${menuOpen?'open':''}`}><span ref={bar} className="progress"/><a href="#top" className="logo" aria-label="Home" onClick={closeMenu}>AS</a>
  <button type="button" className={`nav-toggle ${menuOpen?'active':''}`} aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(o=>!o)}>
    <span/>
    <span/>
    <span/>
  </button>
  <nav aria-label="Primary" className={menuOpen?'active':''}>{L.map(([t,h])=><a key={h} href={h} onClick={closeMenu}>{t}</a>)}</nav></header>);
}
