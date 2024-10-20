'use client'
import { useState, useEffect } from 'react'
import { Search, ChevronRight} from 'lucide-react'
import { Input } from "@/components/ui/input"
import Link from 'next/link' // Import Link for dynamic routing
import { Card } from '@/components/ui/card'
import { Site, SitesResponse } from '@/lib/types/dineOnCampusAPI'

export default function SchoolDirectory() {
  const [schools, setSchools] = useState<Site | []>([])
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch the data dynamically
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/sites') // Adjust endpoint as needed
      const data = await response.json() as SitesResponse
      //eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      setSchools(data.sites)
    }
    fetchData()
  }, [])

  //eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const filteredSchools = schools?.filter((school: Site) =>
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
