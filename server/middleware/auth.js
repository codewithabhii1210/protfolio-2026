import jwt from 'jsonwebtoken';
export const protect=(req,res,next)=>{const h=req.headers.authorization||'';const t=h.startsWith('Bearer ')?h.slice(7):null;
 if(!t)return res.status(401).json({message:'Unauthorized'});
 try{req.user=jwt.verify(t,process.env.JWT_SECRET);next();}catch{res.status(401).json({message:'Invalid token'});}};
