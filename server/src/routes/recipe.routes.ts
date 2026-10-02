import { Router } from 'express';
import {
  createRecipe,
  getUserRecipes,
  getAllRecipes,
  getRecipePage,
} from '../controllers/recipe.controller';

const router = Router();

router.post('/recipes/new', createRecipe);
router.get('/get-user-recipes', getUserRecipes);
router.get('/get-all-recipes/', getAllRecipes);
router.get('/getrecipepage/:id', getRecipePage);

export default router;