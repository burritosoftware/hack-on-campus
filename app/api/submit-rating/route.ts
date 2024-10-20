import { add_rating } from "@/lib/cf";
import { revalidatePath } from "next/cache";

export const runtime = 'edge'
export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const menuId = formData.get('menuId') as string;
        const rating = formData.get('rating') as string;
        const user_id = formData.get('user_id') as string;
        const slug = formData.get('slug') as string;

        await add_rating(menuId, user_id, parseInt(rating));

        console.log(`Submitting rating ${rating} for menu item ${menuId}`);

        console.log(req.url);

        revalidatePath(`${slug}/recipes/${menuId}`);

        return new Response(
            JSON.stringify({ message: "Rating submitted successfully!", success: true }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "An error occurred", success: false }), {
            status: 500,
        });
    }
}
