import { MenuItem } from "./dineOnCampusAPI";

// create a typescript type called Recipe, with string name and menuitem[] items
export interface Recipe {
  name: string;
  author: string;
  description: string;
  rating: number;
  items: MenuItem[];
  recipe_id: string;
}
