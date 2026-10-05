import {validationResult} from 'express-validator';import Contact from '../models/Contact.js';
export const createContact=async(req,res)=>{const e=validationResult(req);if(!e.isEmpty())return res.status(400).json({message:e.array()[0].msg});
 const{name,email,message}=req.body;await Contact.create({name,email,message});res.status(201).json({message:'Received'});};
export const listContacts=async(req,res)=>res.json(await Contact.find().sort('-createdAt'));
