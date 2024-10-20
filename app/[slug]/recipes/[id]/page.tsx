
import { get_recipe, getItem } from '@/lib/cf'
import { Recipe } from '@/lib/types/recipe'
import Link from "next/link";
import {getAllItems} from "@/lib/dineOnCampusAPI";
import {redirect} from "next/navigation";

export const runtime = 'edge'

export default async function Component({ params}: { params: { slug: string, id: string } }) {
    let recipe = await get_recipe(params.id)

    // send a signal to the backend to fetch other food data/ingredients
    // do not be blocking, just as a signal
    // fetch other data in parallel


    console.log(recipe)

    if (!recipe) {
        redirect(`/${params.slug}/discover`)
    }

    recipe = JSON.parse(JSON.stringify(recipe)) as Recipe



console.log(recipe.items)
const items = JSON.parse(recipe.items)

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          {recipe.name}
        </h1>
        {/* I want to have a description, a list of ingrediants, and to list the author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-lg">{recipe.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Ingredients</h2>
            <ul>
              {items.map((item: any) => (
                <li key={item} className="flex items-center justify-between">
                  <span>{(getItem(item)).then((item) => item.name)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold">Author</h2>
            <p>{recipe.author}</p>
          </div>
      </div>
          <div className="mt-8">
              Rate this recipe!
                <Link href={`${params.slug}/recipes/${params.id}/rate`}>
                    <div className="text-blue-400">Rate</div>
                </Link>
          </div>
    </div>
</div>
  )
}
