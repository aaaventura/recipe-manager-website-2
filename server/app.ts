import 'dotenv/config';
// remidner: dotenv is needed now to handle loading env vairables. prisma no longer automatically loads .env stuff here? 
// must be first?


import express, { type Express, type Request, type Response } from 'express';

import { clerkMiddleware } from '@clerk/express';

import { PrismaClient } from '@prisma/client';

import cors from 'cors';


export const prisma = new PrismaClient(); //orm object. use this whenever interacting with Databsae.


const app: Express = express();
const port = 3000;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN ?? 'http://127.0.0.1:5173',
  credentials: true
  // quick reminder: CORS is security line? only allows specified ports to access it. 
  // when we misconfigured our .env in the project, this is what was blocking it. remember that.
  // also, only blocks method api calls. crud stuff. should still be able to see the root if on browser url.
}));

app.use(clerkMiddleware());



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});



app.get('/category-get', async (req, res) => {
  
  //try for database
  try {
    const categories = await prisma.category.findMany();

    console.log('[server] query resolved, rows:', categories.length);

    res.json(categories);
    

  } catch (err) { //remmeber: every try needs a catch for debugging purposes.
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
