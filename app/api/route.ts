export async function GET() {
  let dineoncampusrreq = await fetch("https://api.dineoncampus.com/v1/sites/public")
  let dineoncampusres = await dineoncampusrreq.json()

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