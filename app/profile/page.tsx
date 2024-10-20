

// this is a react seservererv component page
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

import { get_bookmarks, get_user_recipes} from '@/lib/cf'


import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Bookmark, ChefHat, Star, Edit, Trash2 } from 'lucide-react'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";



export const runtime = 'edge'
export default async function Component() {

    const {getUser, isAuthenticated} = getKindeServerSession()


    const isAuth = await isAuthenticated()
    if (!isAuth) {
        redirect('/api/auth/login?redirect=/profile')
    }

    const user = await getUser();

    console.log(user);

    // get user bookmarks
    const bookmarks = await get_bookmarks(user.id);
    console.log(bookmarks);

    // get user recipes
    const recipes = await get_user_recipes(user.id);
    console.log(recipes);

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            <div className="container mx-auto px-4 py-8">
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <div className="flex items-center space-x-4">
                            <div>
                                <CardTitle
                                    className="text-2xl font-bold text-gray-400">{user.given_name} {user.family_name}</CardTitle>
                                <CardDescription className="text-gray-400">@{user.username}</CardDescription>
                                <p className="text-sm text-gray-400 mt-1">{user.email}</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardFooter>
                        <LogoutLink>
                            <Button>
                                Logout
                            </Button>
                        </LogoutLink>
                    </CardFooter>
                </Card>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">
                        <Bookmark className="inline-block w-6 h-6 mr-2"/>
                        Bookmarked Recipes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookmarks.map((recipe: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; rating: number; }) => (
                            <Card key={recipe.id} className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-purple-500/20 transition duration-300 ease-in-out">
                                <CardHeader>
                                    <CardTitle>{recipe.name}</CardTitle>
                                    <CardDescription className="flex items-center">
                                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                        {recipe.rating.toFixed(1)}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <a href="#" className="block w-full py-2 px-4 bg-gray-700 text-center rounded-md hover:bg-gray-600 transition duration-300 ease-in-out">
                                        View Recipe
                                    </a>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">
                        <ChefHat className="inline-block w-6 h-6 mr-2" />
                        My Recipes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.map((recipe: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; rating: number; }) => (
                            <Card key={recipe.id} className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-purple-500/20 transition duration-300 ease-in-out">
                                <CardHeader>
                                    <CardTitle>{recipe.name}</CardTitle>
                                    <CardDescription className="flex items-center">
                                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                        {recipe.rating.toFixed(1)}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex space-x-2">
                                        <a href="#" className="flex-1 py-2 px-4 bg-gray-700 text-center rounded-md hover:bg-gray-600 transition duration-300 ease-in-out">
                                            <Edit className="inline-block w-4 h-4 mr-2" />
                                            Edit
                                        </a>
                                        <a href="#" className="flex-1 py-2 px-4 bg-gray-700 text-center rounded-md hover:bg-gray-600 transition duration-300 ease-in-out">
                                            <Trash2 className="inline-block w-4 h-4 mr-2" />
                                            Delete
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Card className="bg-gray-800 border-gray-700 border-dashed flex items-center justify-center h-[200px] hover:bg-gray-700 transition duration-300 ease-in-out">
                            <CardContent>
                                <a href="#" className="block text-center">
                                    <ChefHat className="w-12 h-12 mx-auto text-gray-500 mb-2" />
                                    <p className="text-gray-500">Create New Recipe</p>
                                </a>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
