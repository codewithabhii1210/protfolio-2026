import {useEffect,useRef} from 'react';import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';import Counter from '../components/Counter';import {CONFIG} from '../config';
gsap.registerPlugin(ScrollTrigger);
const CELLS=140; // 20 weeks x 7 days. Layout only: first N cells = streak length from config (not per-day data)
export default function Journey(){
 const r=useRef();
 useEffect(()=>{const c=gsap.context(()=>gsap.from('.cell',{opacity:0,scale:0,stagger:{each:.008},duration:.4,scrollTrigger:{trigger:'.heat',start:'top 85%',once:true}}),r);return()=>c.revert();},[]);
 return(<section id="journey" ref={r} className="sec"><h2 className="big" data-reveal>{CONFIG.problemsSolved}+ Problems Solved.</h2>
 <div className="stats"><Counter to={CONFIG.problemsSolved} suffix="+" label="Problems Solved"/><Counter to={CONFIG.streakDays} suffix="-Day" label="LeetCode Streak"/></div>
 <div className="heat" role="img" aria-label={`Visualization of a ${CONFIG.streakDays}-day streak`}>{Array.from({length:CELLS},(_,i)=><span key={i} className={'cell'+(i<CONFIG.streakDays?' on':'')}/>)}</div>
 <p className="note" data-reveal>Illustrative visualization of a {CONFIG.streakDays}-day streak. Not actual per-day data.</p><p className="lead acc" data-reveal>Consistency &gt; Motivation.</p></section>);
}
