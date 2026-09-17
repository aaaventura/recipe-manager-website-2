import express, { type Express, type Request, type Response } from 'express';

import { clerkMiddleware } from '@clerk/express';
// clerk middleware

import 'dotenv/config';
// remidner: dotenv is needed now to handle loading env vairables. prisma no longer automatically loads .env stuff here?


const app: Express = express();
const port = 3000;



app.use(clerkMiddleware());



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
