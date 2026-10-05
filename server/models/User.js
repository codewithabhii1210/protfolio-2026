import mongoose from 'mongoose';import bcrypt from 'bcryptjs';
const s=new mongoose.Schema({email:{type:String,required:true,unique:true,lowercase:true},password:{type:String,required:true,select:false},role:{type:String,default:'admin'}},{timestamps:true});
s.pre('save',async function(next){if(this.isModified('password'))this.password=await bcrypt.hash(this.password,12);next();});
s.methods.matches=function(p){return bcrypt.compare(p,this.password);};
export default mongoose.model('User',s);
