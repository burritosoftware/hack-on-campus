'use client'
import { useState } from 'react'
import { ChevronRight, Code, Utensils, Star } from 'lucide-react'
import Link from "next/link";

export default function Component() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Hack On Campus
        </h1>
        <p className="text-2xl mb-8 text-gray-300">
          Hack your way to a better dining hall experience
        </p>
        <p className="text-lg mb-12 text-gray-400">
          (for Chartwells schools only)
        </p>
          <Link href={'/findschool'}>
              <button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition duration-300 ease-in-out transform hover:-translate-y-1">
                  Start Hacking
              </button>
          </Link>
      </header>

        {/* Featured Recipes Section */}
        <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Check out some of these recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        name: 'Ramen Burger',
                        description: 'A fusion of ramen noodles and a classic burger patty, topped with fresh greens and a savory sauce.',
                    },
                    {
                        name: 'Pizza Quesadilla',
                        description: 'A delightful combination of pizza and quesadilla, filled with melted cheese and pepperoni.',
                    },
                    {
                        name: 'Waffle Sandwich',
                        description: 'Crispy waffles sandwiching a delicious mix of bacon, eggs, and cheese, perfect for breakfast or brunch.',
                    }
                ].map((recipe, index) => (
                    <div key={index} className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6 hover:shadow-xl hover:shadow-purple-500/20 transition duration-300 ease-in-out">
                        <Utensils className="w-12 h-12 mb-4 text-purple-400" />
                        <h3 className="text-xl font-bold mb-2">{recipe.name}</h3>
                        <p className="text-gray-400 mb-4">{recipe.description}</p>
                        <button className="bg-purple-500 text-white font-bold py-2 px-4 rounded-full hover:bg-purple-600 transition duration-300 ease-in-out">
                            Try Now
                        </button>
                    </div>
                ))}
            </div>
        </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16 bg-gray-800 rounded-lg my-16">
        <h2 className="text-3xl font-bold mb-8 text-center">What Students Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: 'Zyjay', quote: "These hacks have made campus dining exciting again!" },
            { name: 'Sam', quote: "I never knew I could create such amazing meals with what's available." }
          ].map((testimonial, index) => (
            <div key={index} className="bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6">
                {/* have 5 stars in a row */}
                <div className="flex justify-center space-x-1 mb-4">
                    <Star className="w-8 h-8 mb-4 text-yellow-400" />
                    <Star className="w-8 h-8 mb-4 text-yellow-400" />
                    <Star className="w-8 h-8 mb-4 text-yellow-400" />
                    <Star className="w-8 h-8 mb-4 text-yellow-400" />
                    <Star className="w-8 h-8 mb-4 text-yellow-400" />
                </div>


              <p className="text-lg mb-4">&#34;{testimonial.quote}&#34;</p>
              <p className="font-bold">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Ready to hack your school&#39;s dining hall?</h2>

          <Link href={'/findschool'}>
          <button
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full overflow-hidden transition-all duration-300 ease-in-out"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="relative z-10">See the ones at your school!</span>
          <ChevronRight className={`w-6 h-6 ml-2 transition-transform duration-300 ease-in-out ${isHovered ? 'translate-x-1' : ''}`} />
          <div className="absolute inset-0 bg-white bg-opacity-20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
        </button>
          </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2023 Hack On Campus. All rights reserved.</p>
          <div className="mt-4 flex justify-center items-center">
            <Code className="w-6 h-6 mr-2 text-purple-400" />
            <span className="text-sm text-gray-500">Powered by student innovation</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
