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
// Source post for the HackWave 3.0 result (verified live before adding).
const HACKWAVE_POST='https://www.linkedin.com/posts/abhisheksingh1210_hackwave30-nexheal-neuralx-activity-7516016567810293760-WoJT';
const ACH=[[CONFIG.problemsSolved+'+','Coding Problems','Consistently solving programming and competitive coding problems across coding platforms.'],
['Top 10','HackWave 3.0','Team Neural X advanced from the Top 50 to the Top 10 Grand Finalists out of 1,521 teams at HackWave 3.0, Indore. As Team Lead I built and presented NexHeal to the judges.',HACKWAVE_POST],
['100-Day','LeetCode Streak','Maintained a 100-day coding streak on LeetCode.'],['Internshala','Student Partner','Selected as an Internshala Student Partner, promoting career and internship awareness among students.']];
export function Achievements(){return(<section id="achievements" className="sec"><h2 className="big" data-reveal>Achievements</h2>
 <div className="grid g4">{ACH.map(([a,b,c,src])=><div key={b} className="card" data-tilt data-reveal><b className="num">{a}</b><h3>{b}</h3><p>{c}</p>{src&&<a className="src" href={src} target="_blank" rel="noreferrer">View post ↗</a>}</div>)}</div></section>);}
const EDU=[['2025–2029','LNCT Group of Colleges, Bhopal','B.Tech — Computer Science Engineering','Second Year Undergraduate'],
['2025','K V Bhind, Bhind','Senior Secondary — Class XII','79.6%'],['2023','EMHSS, Bhind','Secondary — Class X','']];
export function Education(){
 const r=useRef();
 useEffect(()=>{const c=gsap.context(()=>gsap.fromTo('.tl-line',{scaleY:0},{scaleY:1,ease:'none',scrollTrigger:{trigger:r.current,start:'top 70%',end:'bottom 70%',scrub:true}}),r);return()=>c.revert();},[]);
 return(<section id="education" ref={r} className="sec"><h2 className="big" data-reveal>Education</h2>
 <div className="tl"><span className="tl-line"/>{EDU.map(([y,s,d,n])=><div key={s} className="tl-item" data-reveal><small>{y}</small><h3>{s}</h3><p>{d}</p>{n&&<p className="acc">{n}</p>}</div>)}</div></section>);}
export function Certification(){
 const [open,setOpen]=useState(false),has=!!CONFIG.certImage;
 const inner=<><small>Issued: November 2025</small><h3>Introduction to Data Science</h3><p>Cisco Networking Academy</p></>;
 return(<section id="cert" className="sec"><h2 className="big" data-reveal>Certification</h2>
 {has
  ?<button className="card certcard" data-tilt data-reveal data-cursor="view" onClick={()=>setOpen(true)}>{inner}</button>
  :<div className="card certcard" data-tilt data-reveal>{inner}</div>}
 {open&&<div className="modal" role="dialog" aria-modal="true" onClick={()=>setOpen(false)}><img src={CONFIG.certImage} alt="Certificate: Introduction to Data Science" loading="lazy"/></div>}</section>);}
const BEYOND=[['Hackathons','HackWave 3.0 (10–12 October, Chameli Devi Group of Institutions, Indore) — Team Neural X went from the Top 50 to the Top 10 Grand Finalists out of 1,521 teams. Also built a line-following robot at TechX 2025, IIT Bombay.',HACKWAVE_POST],['Collaboration','Worked with Reffto in college projects and activities.'],['Creative Design','Designed posters and videos for school and college events.']];
const STR=['Creative thinking','Problem-solving','Teamwork','Leadership','Communication','Sports','Music','Writing'];
const HOB=['Video editing','Graphic designing','Exploring new technologies','Reading about tech innovations'];
export function Beyond(){return(<section id="beyond" className="sec"><h2 className="big" data-reveal>Beyond the Code.</h2>
 <div className="grid">{BEYOND.map(([t,d,src])=><div key={t} className="card" data-tilt data-reveal><h3>{t}</h3><p>{d}</p>{src&&<a className="src" href={src} target="_blank" rel="noreferrer">View post ↗</a>}</div>)}</div>
 <div className="grid"><div className="card" data-reveal><h3>Strengths</h3><div className="chips">{STR.map(x=><span key={x} className="chip">{x}</span>)}</div></div>
 <div className="card" data-reveal><h3>Interests</h3><div className="chips">{HOB.map(x=><span key={x} className="chip">{x}</span>)}</div></div></div></section>);}
