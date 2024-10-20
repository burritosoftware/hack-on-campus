'use client'
import { useState, useEffect } from 'react'
import {Star, Search, Filter, ChevronRight} from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link' // Import Link for dynamic routing
import { Card } from '@/components/ui/card'
import { Site, SitesResponse } from '@/lib/types/dineOnCampusAPI'

export default function SchoolDirectory() {
  const [schools, setSchools] = useState<Site | any>([])
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch the data dynamically
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/sites') // Adjust endpoint as needed
      const data = await response.json() as SitesResponse
      setSchools(data.sites)
    }
    fetchData()
  }, [])

  const filteredSchools = schools.filter((school: Site) =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Find your school
        </h1>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search schools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 bg-gray-800 border-gray-700 text-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* School Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSchools.map((school: Site) => (
            <Link key={school.id} href={`/${school.slug}`}>
              <Card className="bg-gray-800 border-0 rounded-lg p-6 hover:shadow-lg hover:shadow-purple-500/20 transition duration-300 ease-in-out transform hover:-translate-y-1">
                <div className="text-xl font-semibold mb-2 text-white flex inline-flex">{school.name} <ChevronRight /> </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredSchools.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No schools found. Try adjusting your search or filter.</p>
        )}
      </div>
    </div>
  )
}
