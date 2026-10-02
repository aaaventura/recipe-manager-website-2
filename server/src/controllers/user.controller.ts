import { type Request, type Response } from 'express';
import { prisma } from '../../db';

export const getUser = async (req: Request, res: Response) => {
  console.log('clerk_id:', req.query.clerk_id);
  try {

    // is given the current clerk_id. 
    const clerk_id = req.query.clerk_id as string;

    // find user with where clerk_id: query 
    const userRow = await prisma.user.findUnique({ where: { clerk_id } });

    res.json(userRow);

    // send back as json?

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to fetch user' });
  }
};