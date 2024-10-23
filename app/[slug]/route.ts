import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  console.log(request.url)

  // append /discover to the existing url

  return redirect(`${request.url}/discover`)
}
