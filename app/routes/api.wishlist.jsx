import { json } from "@remix-run/node";

export async function loader(){
   
    return json({
        ok: true,
        message: "Hello from the API!",
    })
}

export async function action ({request}){
    const method = request.method;

    switch (method){
        case "POST":
            return json ({message: "Success", method: "POST"});
        case "PATCH":
            return json ({message: "Success", method: "Patch"});
        default:
            return new Response("Method not allowed", {status: 405});
    }

    
}