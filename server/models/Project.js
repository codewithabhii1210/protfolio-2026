import mongoose from 'mongoose';
export default mongoose.model('Project',new mongoose.Schema({title:{type:String,required:true},slug:{type:String,unique:true},description:String,technologies:[String],image:String,githubUrl:String,liveUrl:String,featured:Boolean,year:Number},{timestamps:true}));
