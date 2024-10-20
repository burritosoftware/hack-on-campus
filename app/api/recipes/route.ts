import { get_recipes } from "@/lib/cf";

export async function GET(_request: Request) {
  // deno-lint-ignore prefer-const
  let sites = await get_recipes()

  return new Response(JSON.stringify(sites), {
    headers: {
      "content-type": "application/json",
    },
  });
}