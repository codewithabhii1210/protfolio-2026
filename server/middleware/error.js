export const notFound=(req,res)=>res.status(404).json({message:'Not found'});
export const errorHandler=(err,req,res,next)=>res.status(err.status||500).json({message:err.message||'Server error'});
export const asyncH=fn=>(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
