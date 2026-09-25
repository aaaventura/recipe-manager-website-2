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




app.post("/create-recipe", async (req, res) => {

  const { userId } = getAuth(req);

  if (!userId) {

    console.log("user is not authenticated");
    return res.status(401).json({ error: "Unauthorized" });
  }
  console.log(userId);
  console.log("create recipe called");
  console.log("body: ", req.body);
  

  console.log("Pushing the stuff.")
  const recipe = await prisma.recipe.create({
      data: {
        title: req.body.title.trim(),
        user: {
          connect: { clerk_id: userId }, 
        },
        ingredients: {
          create: req.body.ingredients.map((name: string) => ({
            ingredient: name,
            description: "",
          })),
        },
        directions: {
          create: req.body.directions.map((description: string, index: number) => ({
            description,
            recipe_step: index + 1, 
          })),
        },
        categories: {
          create: req.body.categories.map((name: string) => ({
            category: {
              connectOrCreate: {
                where: { category_name: name },
                create: { category_name: name },
              },
            },
          })),
        },
      },
    });
  
  // two steps I need to do. 

  // process data to be pushed to database. 

  // order the instructons.
  // pull, apply... create relations?
  // this is where i last ended off.

  res.json({ ok: true, message: "pong" });
  res.status(201).json(recipe)
});


app.get("/get-user-recipes", async (req, res) => {
  const clerkId = req.query.clerk_id as string;
  if (!clerkId) return res.status(400).json({ error: "clerk_id required" });

  const recipes = await prisma.recipe.findMany({
    where: { user: { clerk_id: clerkId } },
    orderBy: { created_at: "desc" },
  });

  res.json(recipes);
});




app.get("/get-all-recipes", async (req, res) => {
  console.log("get all recipes called.");
  
  // recipe grab
  const recipes = await prisma.recipe.findMany({
    include: {
      user: {
        select: { first_name: true, last_name: true, username: true },
      }
    }
  });

  console.log("response: ", recipes);
  res.json(recipes);

})



app.get("/getrecipepage/:id", async (req, res) => {
  console.log(`get-recipe-page called: ${req.params.id}`);

  const id = req.params.id;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        user: {
          select: { first_name: true, last_name: true, username: true },
        },
        directions: {
          orderBy: { recipe_step: 'asc' },
        },
        ingredients: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });      
    res.json(recipe);                    
                                 
  } catch (err) {                
    console.error(err);
    res.status(500).json({ error: 'Server error' });
    return;                      
  }

  
});



app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
});
