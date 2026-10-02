import { type Request, type Response } from 'express';
import { prisma } from '../../db';

export const getCategories = async (req: Request, res: Response) => {
  //try for database
  try {
    const categories = await prisma.category.findMany();

    console.log('[server] query resolved, rows:', categories.length);

    res.json(categories);

  } catch (err) { //remmeber: every try needs a catch for debugging purposes.
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};