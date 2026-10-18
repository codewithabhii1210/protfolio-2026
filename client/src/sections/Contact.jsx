import {useState} from 'react';import {sendContact} from '../services/api';import {CONFIG} from '../config';
const short=u=>String(u).replace(/^https?:\/\/(www\.)?/,'').replace(/\/$/,'');
export default function Contact(){
 const [s,setS]=useState('idle'),[msg,setMsg]=useState('');
 const submit=async e=>{e.preventDefault();if(s==='sending')return;setS('sending');setMsg('');
  const f=Object.fromEntries(new FormData(e.target));
  try{await sendContact(f);setS('ok');e.target.reset();}catch(x){setMsg(x.message||'Something went wrong. Try again.');setS('err');}};
 return(<section id="contact" className="sec">
  <h2 className="big">Let's Build Something.</h2>
  <p className="lead">Have an idea, opportunity or project in mind? Send it over — every message reaches me instantly on WhatsApp and email, and I reply as soon as I can.</p>
  <div className="cwrap">
   <div className="cinfo">
    <a className="crow" data-mag href={CONFIG.whatsapp} target="_blank" rel="noreferrer"><span className="ci">WA</span><span><b>WhatsApp</b><small>{CONFIG.phone}</small></span></a>
    <a className="crow" data-mag href={`mailto:${CONFIG.email}`}><span className="ci">@</span><span><b>Email</b><small>{CONFIG.email}</small></span></a>
    <a className="crow" data-mag href={CONFIG.linkedin} target="_blank" rel="noreferrer"><span className="ci">in</span><span><b>LinkedIn</b><small>{short(CONFIG.linkedin)}</small></span></a>
    <a className="crow" data-mag href={CONFIG.github} target="_blank" rel="noreferrer"><span className="ci">&lt;/&gt;</span><span><b>GitHub</b><small>{short(CONFIG.github)}</small></span></a>
    <p className="note">Open to internships, freelance builds and collaboration.</p>
   </div>
   <form onSubmit={submit} className="form">
    <input name="name" placeholder="Name" autoComplete="name" required/>
    <input name="email" type="email" placeholder="Email" autoComplete="email" required/>
    <textarea name="message" placeholder="Message" rows="5" minLength="5" required/>
    <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp"/>
    <button data-mag className="btn primary" disabled={s==='sending'}>{s==='sending'?'Sending…':'Send Message'}</button>
    <p role="status" className={s==='ok'?'acc':''}>{s==='ok'?'Thanks — message sent. I will get back to you soon.':s==='err'?(msg||'Something went wrong. Try again.'):''}</p>
   </form>
  </div>
 </section>);
}
