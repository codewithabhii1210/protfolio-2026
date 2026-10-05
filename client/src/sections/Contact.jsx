import {useState} from 'react';import {sendContact} from '../services/api';import {CONFIG} from '../config';
export default function Contact(){
 const [s,setS]=useState('idle');
 const submit=async e=>{e.preventDefault();setS('sending');const f=Object.fromEntries(new FormData(e.target));
  try{await sendContact(f);setS('ok');e.target.reset();}catch{setS('err');}};
 return(<section id="contact" className="sec"><h2 className="big">Let's Build Something.</h2>
  <p className="lead">Have an idea, opportunity or project in mind? Let's connect.</p>
  <form onSubmit={submit} className="form"><input name="name" placeholder="Name" required/><input name="email" type="email" placeholder="Email" required/>
   <textarea name="message" placeholder="Message" rows="5" required/><button data-mag className="btn primary" disabled={s==='sending'}>{s==='sending'?'Sending…':'Send Message'}</button>
   <p role="status">{s==='ok'&&'Thanks, message sent.'}{s==='err'&&'Something went wrong. Try again.'}</p></form>
  <div className="row"><a data-mag className="btn" href={CONFIG.github}>GitHub</a><a data-mag className="btn" href={CONFIG.linkedin}>LinkedIn</a><a data-mag className="btn" href={`mailto:${CONFIG.email}`}>Email</a></div></section>);
}
