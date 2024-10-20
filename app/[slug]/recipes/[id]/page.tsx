import { Star, Search, Filter } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { get_recipe, getItem } from '@/lib/cf'
import { Recipe } from '@/lib/types/recipe'
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from 'react'

export const runtime = 'edge'

export default async function Component({ params}: { params: { slug: string, id: string } }) {
    let recipe = await get_recipe(params.id)

    recipe = JSON.parse(JSON.stringify(recipe)) as Recipe

    if (!recipe) {
        return <div>Recipe not found</div>
    }

console.log(recipe.items)
let items = JSON.parse(recipe.items)

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
    </div>
</div>
  )
}