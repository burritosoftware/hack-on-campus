
// use NExt.js API routes to fetch data from Dine On Campus API
// parms: site_id


type RouteParams = { params: { site_id: string } };
import { getLocationStatus } from "../../../../lib/dineOnCampusAPI";
export async function GET(request: Request, context: RouteParams) {
  // Fetch Dine On Campus API
  // With the site_id in the URL, get the site in array sites and return the info in it's object
  // https://api.dineoncampus.com/v1/locations/status?site_id=[site id]&platform=0


  // if no site_id in URL, catch and return error
  if (!context.params.site_id) {
    return new Response("No site_id provided", {
      status: 400,
    });
  }



    // Fetch Dine On Campus API
  const sites = await getLocationStatus(context.params.site_id);



  // Return Dine On Campus API response
  return new Response(JSON.stringify(sites), {
    headers: {
      "content-type": "application/json",
    },
  })
}
