
// use Next.js API routes to fetch data from Dine On Campus API
// params: location_id
// querystring: date (optional)


type RouteParams = { params: { location_id: string } };
import { getAllItems } from "../../../../../lib/dineOnCampusAPI";

export async function GET(request: Request, context: RouteParams) {
  // Return all items using getAllItems function

  let items = await getAllItems(context.params.location_id)
  return new Response(JSON.stringify(items), {
    headers: {
      "content-type": "application/json",
    },
  })
}
