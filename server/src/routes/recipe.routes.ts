import { Router } from 'express';
import {
  createRecipe,
  getUserRecipes,
  getAllRecipes,
  getRecipePage,
} from '../controllers/recipe.controller';

const router = Router();

router.post('/recipes/new', createRecipe);
router.get('/recipes/user/get', getUserRecipes);
router.get('/recipes/all/get/', getAllRecipes);
router.get('/recipe/page/:id', getRecipePage);

export default router;