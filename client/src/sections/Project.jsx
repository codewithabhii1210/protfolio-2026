import {CONFIG} from '../config';
const stack=['React.js','Vite','Tailwind CSS','Node.js','Express.js','REST APIs','Gemini API'];
export default function Project(){
 return(<section id="work" className="sec"><p className="tag" data-reveal>Featured Project · 2026</p><h2 className="big" data-reveal>SEHATSAARTHI</h2>
  <div className="stage" data-reveal><div className="pcard" data-tilt data-cursor="view"><span>Project visual</span></div></div>
  <p className="lead" data-reveal>SehatSaarthi is a full-stack healthcare application designed to provide accessible digital healthcare assistance through a modern web platform.</p>
  <ul className="list" data-reveal><li>Architected a full-stack app with React.js, Vite and Tailwind CSS using reusable components.</li><li>Built role-based interfaces across the platform.</li><li>Engineered RESTful services with Node.js and Express.js.</li><li>Integrated Google Gemini API for AI-driven healthcare assistance and prediction workflows.</li></ul>
  <div className="tags" data-reveal>{stack.map(s=><span key={s}>{s}</span>)}</div>
  <div className="row" data-reveal><a data-mag className="btn primary" href="#architecture">View Case Study</a><a data-mag className="btn" href={CONFIG.projectGithub}>GitHub</a><a data-mag className="btn" href={CONFIG.projectLive}>Live Demo</a></div></section>);
}
