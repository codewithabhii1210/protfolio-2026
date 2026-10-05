import {v2 as cloudinary} from 'cloudinary';
export const uploadBuffer=buf=>{cloudinary.config({cloud_name:process.env.CLOUDINARY_CLOUD_NAME,api_key:process.env.CLOUDINARY_API_KEY,api_secret:process.env.CLOUDINARY_API_SECRET});
 return new Promise((ok,no)=>cloudinary.uploader.upload_stream({folder:'portfolio',transformation:[{quality:'auto',fetch_format:'auto'}]},(e,r)=>e?no(e):ok(r)).end(buf));};
