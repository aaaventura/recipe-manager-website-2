import { type Request, type Response } from 'express';
import { getAuth } from '@clerk/express';
import { prisma } from '../../db';

export const createRecipe = async (req: Request, res: Response) => {
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

  res.status(201).json({ id: recipe.id });
};

export const getUserRecipes = async (req: Request, res: Response) => {
  const clerkId = req.query.clerk_id as string;
  if (!clerkId) return res.status(400).json({ error: "clerk_id required" });

  const recipes = await prisma.recipe.findMany({
    where: { user: { clerk_id: clerkId } },
    orderBy: { created_at: "desc" },
  });

  res.json(recipes);
};

export const getAllRecipes = async (req: Request, res: Response) => {
  console.log("get all recipes called.");

  const { category } = req.query || null;
  console.log("here is category: ", category);

  const whereQuery = category
  ? {
      categories: {
        some: {
          category_id: Array.isArray(category) ? { in: category } : category,
        },
      },
    }
  : {};

  console.log("whereQuery: ", whereQuery);

  // recipe grab
  const recipes = await prisma.recipe.findMany({
    where: whereQuery,
    include: {
      user: {
        select: { first_name: true, last_name: true, username: true },
      },
      categories: {
        include: {                       
          category: true,               
        },
      },
    }
  });

  // console.log("response: ", recipes);
  res.json(recipes);
};

export const getRecipePage = async (req: Request, res: Response) => {
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
};