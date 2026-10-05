import 'dotenv/config';import mongoose from 'mongoose';import app from './app.js';
if(!process.env.MONGO_URI||!process.env.JWT_SECRET){console.error('Set MONGO_URI and JWT_SECRET in server/.env');process.exit(1);}
await mongoose.connect(process.env.MONGO_URI);
app.listen(process.env.PORT||5000,()=>console.log('API running'));
