import 'dotenv/config';import mongoose from 'mongoose';import User from '../models/User.js';import Project from '../models/Project.js';
await mongoose.connect(process.env.MONGO_URI);
if(!(await User.findOne({email:process.env.ADMIN_EMAIL.toLowerCase()})))await User.create({email:process.env.ADMIN_EMAIL,password:process.env.ADMIN_PASSWORD});
await Project.updateOne({slug:'sehatsaarthi'},{$setOnInsert:{title:'SehatSaarthi',slug:'sehatsaarthi',year:2026,featured:true,
 description:'A full-stack healthcare application providing accessible digital healthcare assistance through a modern web platform.',
 technologies:['React.js','Vite','Tailwind CSS','Node.js','Express.js','REST APIs','Gemini API']}},{upsert:true});
console.log('Seeded admin + project');await mongoose.disconnect();
