// This route should not be accessed, so if it is return a 400 error




export async function GET() {


    return new Response("Invalid route", {
        status: 400,
    });
}
