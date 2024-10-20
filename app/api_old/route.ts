import { balls } from "@/lib/cf"


export const runtime = 'edge';
export async function GET() {
  const dineoncampusrreq = await fetch("https://api.dineoncampus.com/v1/sites/public")
  const dineoncampusres = await dineoncampusrreq.json()


  console.log("hi");
  await balls()

  return new Response(JSON.stringify(dineoncampusres), {
    headers: {
      "content-type": "application/json",
    },
  })
}


/*
/[site id]
- info/name/slug
/[site id]/loctions
- locations
/[site id]/loctions/[id]


/[site id]/items

/[site id]/items/[id]

/recipies

/recipes/[id]
 - name + info
 - gives item (ingredients) ids


*/
