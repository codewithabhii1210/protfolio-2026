import {useState} from 'react';import {sendContact} from '../services/api';import {CONFIG} from '../config';
export default function Contact(){
 const [s,setS]=useState('idle'),[msg,setMsg]=useState('');
 const submit=async e=>{e.preventDefault();setS('sending');const f=Object.fromEntries(new FormData(e.target));
  try{await sendContact(f);setS('ok');setMsg('');e.target.reset();}catch(x){setMsg(x.message||'Something went wrong. Try again.');setS('err');}};
 return(<section id="contact" className="sec"><h2 className="big">Let's Build Something.</h2>
  <p className="lead">Have an idea, opportunity or project in mind? Let's connect.</p>
  <form onSubmit={submit} className="form"><input name="name" placeholder="Name" required/><input name="email" type="email" placeholder="Email" required/>
   <textarea name="message" placeholder="Message" rows="5" minLength="5" required/><button data-mag className="btn primary" disabled={s==='sending'}>{s==='sending'?'Sending…':'Send Message'}</button>
   <p role="status">{s==='ok'&&'Thanks, message sent.'}{s==='err'&&(msg||'Something went wrong. Try again.')}</p></form>
  <div className="row"><a data-mag className="btn" href={CONFIG.github} target="_blank" rel="noreferrer">GitHub</a><a data-mag className="btn" href={CONFIG.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a data-mag className="btn" href={`mailto:${CONFIG.email}`}>Email</a></div></section>);
}
