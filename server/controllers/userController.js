import jwt from 'jsonwebtoken';import {validationResult} from 'express-validator';import User from '../models/User.js';
export const login=async(req,res)=>{const e=validationResult(req);if(!e.isEmpty())return res.status(400).json({message:e.array()[0].msg});
 const u=await User.findOne({email:req.body.email}).select('+password');
 if(!u||!(await u.matches(req.body.password)))return res.status(401).json({message:'Invalid credentials'});
 res.json({token:jwt.sign({id:u._id,role:u.role},process.env.JWT_SECRET,{expiresIn:'1d'})});};
