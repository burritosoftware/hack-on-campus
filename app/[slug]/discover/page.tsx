'use client'
import { useEffect, useState } from 'react'
import { Star, Search, Filter } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// mock data
import mock from '@/lib/recipes.json'
import { Card } from '@/components/ui/card'
import { get_recipes } from '@/lib/cf'
import { Recipe } from '@/lib/types/recipe'




export default function Component() {

const [foodHacks, setFoodHacks] = useState<Recipe[]>([])

// Fetch the data dynamically
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/recipes') // Adjust endpoint as needed
      const data = await response.json() as Recipe[]

      setFoodHacks(data)
    }
    fetchData()
  }, [])

const categories = ["All"];
foodHacks.forEach(hack => {
  if (!categories.includes(hack.author)) {
    categories.push(hack.author);
  }
});


  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredHacks = foodHacks.filter(hack => 
    hack.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || hack.author === selectedCategory)
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Food Hack Library
        </h1>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search hacks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 bg-gray-800 border-gray-700 text-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Select onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px] bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredHacks.map((hack) => (
            <div key={hack.name} className={" bg-gray-800 rounded-lg p-6 hover:shadow-lg hover:shadow-purple-500/20 transition duration-300 ease-in-out transform hover:-translate-y-1 "}>
              <div className="text-xl font-semibold mb-2">{hack.name}</div>
              <p className="text-gray-400 mb-4">{hack.author}</p>
              <div className="flex items-center">
                <Star className="text-yellow-400 mr-1" />
                <span>{hack.rating.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredHacks.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No food hacks found. Try adjusting your search or filter.</p>
        )}
      </div>
    </div>
  )
}