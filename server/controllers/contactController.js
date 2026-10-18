import {validationResult} from 'express-validator';import Contact from '../models/Contact.js';
import {connectDatabase} from '../config/database.js';import {notifyOwner} from '../services/notify.js';import {background} from '../services/background.js';

export const createContact=async(req,res)=>{
 const e=validationResult(req);if(!e.isEmpty())return res.status(400).json({message:e.array()[0].msg});
 const{name,email,message}=req.body;
 // Honeypot field: bots fill it, humans never see it. Pretend success, notify nobody.
 if(req.body.website)return res.status(201).json({message:'Received'});

 // Answer the visitor immediately; the DB write and the WhatsApp + email
 // notifications run after the response (waitUntil) so a cold MongoDB
 // connect can no longer make the form hang for seconds.
 const job=(async()=>{
   await connectDatabase();
   await Contact.create({name,email,message});
   await notifyOwner({name,email,message});
 })();
 if(!background(job))await Promise.race([job,new Promise(r=>setTimeout(r,6000))]);
 res.status(201).json({message:'Received'});
};

export const listContacts=async(req,res)=>res.json(await Contact.find().sort('-createdAt'));
