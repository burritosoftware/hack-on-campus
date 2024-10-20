import { importRecipeJSON } from "@/lib/importRecipeJSON";

export const runtime = 'edge';
export async function GET() {


  console.log("hi");
  await importRecipeJSON();
  console.log("owo");

  return new Response("it's done bitch");
}