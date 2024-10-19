import { getPublicSites } from "../../../lib/dineOnCampusAPI";

export async function GET(_request: Request) {
  // deno-lint-ignore prefer-const
  let sites = await getPublicSites()

  return new Response( JSON.stringify(sites), {
    headers: {
      "content-type": "application/json",
    },
  });
}