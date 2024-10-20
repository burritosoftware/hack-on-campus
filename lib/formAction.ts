'use server'

import {revalidatePath} from "next/cache";
import {add_rating} from "@/lib/cf";

export async function submitRating(prevState: any, formData: FormData) {
    const menuId = formData.get('id') as string
    const rating = formData.get('rating') as string
    const user_id = formData.get('user_id') as string

    // TODO: Implement actual rating submission logic here
    // This is where you would typically interact with your database
    await add_rating(menuId, user_id, parseInt(rating))

    console.log(`Submitting rating ${rating} for menu item ${menuId}`)

    // Simulate a delay to mimic database operation
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Revalidate the recipe page to reflect the new rating
    revalidatePath(`/recipes/${menuId}`)

    return { message: 'Rating submitted successfully!', success: true }
}
