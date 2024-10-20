import { get_recipes } from "@/lib/cf";


export const runtime = "edge";

export async function GET() {
  // deno-lint-ignore prefer-const
  const sites = await get_recipes()

  return new Response(JSON.stringify(sites), {
    headers: {
      "content-type": "application/json",
    },
  });
}
