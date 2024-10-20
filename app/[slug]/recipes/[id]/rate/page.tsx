'use client'

import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import { Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useFormState } from 'react-dom'
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { submitRating } from '@/lib/formAction'

export default function RatingPage({ params }: { params: { slug: string, id: string } }) {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const router = useRouter()
    const [state] = useFormState(submitRating, null)
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState('')

    // get Kinde login session, on the client
    const {user, isLoading} = useKindeBrowserClient();

   useEffect(() => {
       if (!isLoading) {
           if (user) {
               setUserId(user.id)
               console.log(loading)
           }
       }
    }, [isLoading])



    const handleSubmit = async (formData: FormData) => {
        try {
            setLoading(true);

            formData.append('menuId', params.id);
            formData.append('rating', rating.toString());
            formData.append('user_id', userId);
            formData.append('slug', params.slug);

            console.log(formData)

            const response = await fetch('/api/submit-rating', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            //@ts-ignore
            if (result?.success) {
                router.replace(`/${params.slug}/recipes/${params.id}`);
            } else {
                //@ts-ignore
                console.error(result?.message);
            }
        } catch (error) {
            console.error("Failed to submit rating:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans flex items-center justify-center">
            <Card className="w-full max-w-md bg-gray-800 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white text-center">Rate your experience</CardTitle>
                    <CardDescription className="text-center text-gray-400">with this recipe</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit}>
                        <div className="flex justify-center space-x-1 mb-6">
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1
                                return (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={() => setRating(ratingValue)}
                                            className="hidden"
                                        />
                                        <Star
                                            className={`cursor-pointer transition-colors duration-200 ${
                                                ratingValue <= (hover || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                                            }`}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(0)}
                                            size={32}
                                        />
                                    </label>
                                )
                            })}
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
                            disabled={rating === 0}
                        >
                            Submit
                        </Button>
                    </form>
                    {state && state.message && (
                        <p className={`mt-4 text-center ${state.success ? 'text-green-400' : 'text-red-400'}`}>
                            {state.message}
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
