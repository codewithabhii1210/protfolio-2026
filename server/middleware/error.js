export const notFound=(req,res)=>res.status(404).json({message:'Not found'});

// Express identifies error middleware by its 4-arity signature; `next` must stay.
export const errorHandler=(err,req,res,next)=>{
  let status=err.status||err.statusCode;
  let message=err.message;

  if(err.name==='CastError'){
    // A malformed :id means the resource does not exist; any other bad field
    // is a client input problem. Neither should surface as a 500.
    status=err.path==='_id'?404:400;
    message=err.path==='_id'?'Not found':`Invalid value for "${err.path}"`;
  }else if(err.name==='ValidationError'){
    status=400;
    message=Object.values(err.errors||{}).map(e=>e.message).filter(Boolean)[0]||'Validation failed';
  }else if(err.code===11000){
    status=409;
    message='A record with that value already exists';
  }else if(err.name==='MulterError'){
    status=400;
    message=err.code==='LIMIT_FILE_SIZE'?'File too large (max 5MB)':(err.message||'Upload failed');
  }else if(err.type==='entity.parse.failed'){
    status=400;
    message='Invalid JSON body';
  }else if(err.type==='entity.too.large'){
    status=413;
    message='Payload too large';
  }

  if(!status||status>=500){
    // Real server faults stay opaque to the caller; log the cause server-side
    // so model names, schema paths and stack traces never reach the client.
    console.error('[api]',req.method,req.originalUrl,err);
    status=500;
    message='Server error';
  }

  res.status(status).json({message});
};

export const asyncH=fn=>(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
