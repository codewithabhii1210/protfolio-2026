import express from 'express';import cors from 'cors';import helmet from 'helmet';import routes from './routes/index.js';import {notFound,errorHandler} from './middleware/error.js';
const app=express();app.use(helmet());
// Behind Vercel every request carries X-Forwarded-For; without this the rate
// limiter sees one shared bogus IP and would throttle unrelated visitors.
if(process.env.VERCEL)app.set('trust proxy',1);
app.use(cors({origin:process.env.CLIENT_ORIGIN}));app.use(express.json({limit:'100kb'}));
app.use('/api',routes);app.use(notFound);app.use(errorHandler);export default app;
