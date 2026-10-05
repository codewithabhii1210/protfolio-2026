import {useEffect,useRef,useState} from 'react';import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';import Counter from '../components/Counter';import {CONFIG} from '../config';
gsap.registerPlugin(ScrollTrigger);
export function About(){return(<section id="about" className="sec"><p className="tag" data-reveal>Who is Abhi?</p><h2 className="big" data-reveal>Building. Solving. Learning.</h2>
 <p className="lead" data-reveal>I’m a Computer Science undergraduate at LNCT Group of Colleges, Bhopal, focused on full-stack development and problem solving.</p>
 <p className="lead" data-reveal>I enjoy turning ideas into functional web applications and continuously improving my programming fundamentals by solving coding problems across competitive programming platforms.</p>
 <div className="stats"><Counter to={CONFIG.problemsSolved} suffix="+" label="Problems Solved"/><Counter to={CONFIG.streakDays} suffix=" Days" label="Coding Streak"/><div className="stat" data-reveal><b>CSE</b><small>Undergraduate</small></div></div></section>);}
const STACK={Programming:['Java','C','JavaScript'],Frontend:['HTML','CSS','React.js','Vite','Tailwind CSS'],Backend:['Node.js','Express.js','REST APIs'],'Database & Cloud':['MongoDB','Mongoose','Cloudinary'],Tools:['Git','GitHub','VS Code','IntelliJ IDEA'],'Creative & Productivity':['Canva','MS Office','Prompt Engineering','Vibe Coding','Video Editing']};
export function Stack(){return(<section id="stack" className="sec"><h2 className="big" data-reveal>Technologies I Work With</h2>
 <div className="grid">{Object.entries(STACK).map(([c,items])=><div key={c} className="card" data-tilt data-reveal><h3>{c}</h3>
 <div className="chips">{items.map(t=><span key={t} className="chip"><i>{t[0]}</i>{t}</span>)}</div></div>)}</div></section>);}
const ACH=[[CONFIG.problemsSolved+'+','Coding Problems','Consistently solving programming and competitive coding problems across coding platforms.'],
['100-Day','LeetCode Streak','Maintained a 100-day coding streak on LeetCode.'],['Internshala','Student Partner','Selected as an Internshala Student Partner, promoting career and internship awareness among students.']];
export function Achievements(){return(<section id="achievements" className="sec"><h2 className="big" data-reveal>Achievements</h2>
 <div className="grid">{ACH.map(([a,b,c])=><div key={b} className="card" data-tilt data-reveal><b className="num">{a}</b><h3>{b}</h3><p>{c}</p></div>)}</div></section>);}
const EDU=[['2025–2029','LNCT Group of Colleges, Bhopal','B.Tech — Computer Science Engineering','Second Year Undergraduate'],
['2025','K V Bhind, Bhind','Senior Secondary — Class XII','79.6%'],['2023','EMHSS, Bhind','Secondary — Class X','']];
export function Education(){
 const r=useRef();
 useEffect(()=>{const c=gsap.context(()=>gsap.fromTo('.tl-line',{scaleY:0},{scaleY:1,ease:'none',scrollTrigger:{trigger:r.current,start:'top 70%',end:'bottom 70%',scrub:true}}),r);return()=>c.revert();},[]);
 return(<section id="education" ref={r} className="sec"><h2 className="big" data-reveal>Education</h2>
 <div className="tl"><span className="tl-line"/>{EDU.map(([y,s,d,n])=><div key={s} className="tl-item" data-reveal><small>{y}</small><h3>{s}</h3><p>{d}</p>{n&&<p className="acc">{n}</p>}</div>)}</div></section>);}
export function Certification(){
 const [open,setOpen]=useState(false);
 return(<section id="cert" className="sec"><h2 className="big" data-reveal>Certification</h2>
 <button className="card certcard" data-tilt data-reveal data-cursor="view" onClick={()=>CONFIG.certImage&&setOpen(true)}>
 <small>Issued: November 2025</small><h3>Introduction to Data Science</h3><p>Cisco Networking Academy</p></button>
 {open&&<div className="modal" role="dialog" aria-modal="true" onClick={()=>setOpen(false)}><img src={CONFIG.certImage} alt="Certificate: Introduction to Data Science" loading="lazy"/></div>}</section>);}
export function MoreWork(){return(<section id="more" className="sec"><p className="tag" data-reveal>More Work · Vibe Coding</p><h2 className="big" data-reveal>Web Experiments.</h2>
 <div className="grid">{CONFIG.clones.map(([n,u])=><a key={n} className="card" data-tilt data-reveal href={u||undefined} target="_blank" rel="noreferrer"><h3>{n}</h3><p>{u?'View project →':'Link coming soon'}</p></a>)}</div></section>);}
const BEYOND=[['Hackathons','Participated in various hackathons.'],['Collaboration','Worked with Reffto in college projects and activities.'],['Creative Design','Designed posters and videos for school and college events.']];
const STR=['Creative thinking','Problem-solving','Teamwork','Leadership','Communication','Sports','Music','Writing'];
const HOB=['Video editing','Graphic designing','Exploring new technologies','Reading about tech innovations'];
export function Beyond(){return(<section id="beyond" className="sec"><h2 className="big" data-reveal>Beyond the Code.</h2>
 <div className="grid">{BEYOND.map(([t,d])=><div key={t} className="card" data-tilt data-reveal><h3>{t}</h3><p>{d}</p></div>)}</div>
 <div className="grid"><div className="card" data-reveal><h3>Strengths</h3><div className="chips">{STR.map(x=><span key={x} className="chip">{x}</span>)}</div></div>
 <div className="card" data-reveal><h3>Interests</h3><div className="chips">{HOB.map(x=><span key={x} className="chip">{x}</span>)}</div></div></div></section>);}
