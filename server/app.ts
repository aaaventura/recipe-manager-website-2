import 'dotenv/config';
// remidner: dotenv is needed now to handle loading env vairables. prisma no longer automatically loads .env stuff here? 
// must be first?


import express, { type Express, type Request, type Response } from 'express';

import { clerkMiddleware, getAuth} from '@clerk/express';

import { PrismaClient } from '@prisma/client';

import cors from 'cors';


export const prisma = new PrismaClient(); //orm object. use this whenever interacting with Databsae.


const app: Express = express();
const port = 3000;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN ?? 'http://127.0.0.1:5173',
  credentials: true
}));

app.use(clerkMiddleware());

app.use(express.json());


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



app.get('/user-get', async (req, res) => {
  console.log('clerk_id:', req.query.clerk_id);
  try{
    
    // is given the current clerk_id. 
    const clerk_id = req.query.clerk_id;

    // find user with where clerk_id: query 
    const userRow = await prisma.user.findUnique({ where: { clerk_id } });

    res.json(userRow);

   

    // send back as json?

  }catch(err){
    console.error(err);
    res.status(500).json({error: 'failed to fetch user'});
  }
})


app.get("/user-recipe-count", async (req, res) => {
  // grab clerk id. 

  // call prisma to recipes table based on\
  // select many where user_id = req 


  // count how many 

  // respond just a single number.
})



app.post("/create-recipe", async (req, res) => {

  const { userId } = getAuth(req);

  if (!userId) {

    console.log("user is not authenticated");
    return res.status(401).json({ error: "Unauthorized" });
  }
  console.log(userId);
  console.log("create recipe called");
  console.log("body: ", req.body);
  res.json({ ok: true, message: "pong" });
  
  // two steps I need to do. 

  // process data to be pushed to database. 
  // pull, apply... create relations?
  
});






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
