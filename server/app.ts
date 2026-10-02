import 'dotenv/config';
// remidner: dotenv is needed now to handle loading env vairables. prisma no longer automatically loads .env stuff here? 
// must be first?

import express, { type Express, type Request, type Response } from 'express';

import { clerkMiddleware } from '@clerk/express';

import cors from 'cors';

import categoryRoutes from './src/routes/category.routes.ts';
import userRoutes from './src/routes/user.routes.ts';
import recipeRoutes from './src/routes/recipe.routes.ts';

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

// route registration
app.use('/', categoryRoutes);
app.use('/', userRoutes);
app.use('/', recipeRoutes);

app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
});