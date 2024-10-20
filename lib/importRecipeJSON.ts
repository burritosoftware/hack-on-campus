// Import recipes.json into the d1 database using cf.ts

import { create_recipe, set_in_kv } from './cf';
import { Recipe } from './types/recipe';
import recipes from './recipes.json';

export async function importRecipeJSON() {
  for (const recipe of recipes.recipes as unknown as Recipe[]) {
    console.log(recipe);
    await create_recipe(recipe.name, recipe.author, recipe.description, recipe.rating, recipe.items);
  }
}