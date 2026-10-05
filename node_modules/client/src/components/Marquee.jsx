const W=['React.js','Node.js','Express.js','MongoDB','Java','Tailwind CSS','Gemini API','REST APIs','Vite','GSAP','Git'];
export default function Marquee(){return(<div className="marquee" aria-hidden="true"><div className="track">{[...W,...W].map((w,i)=><span key={i}>{w}<b>✦</b></span>)}</div></div>);}
