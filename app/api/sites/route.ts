import { getPublicSites } from "../../../lib/dineOnCampusAPI";

export async function GET() {
  // deno-lint-ignore prefer-const
  const sites = await getPublicSites()

  return new Response( JSON.stringify(sites), {
    headers: {
      "content-type": "application/json",
    },
  });
}
