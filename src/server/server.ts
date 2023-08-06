import { getAgentDetails } from './agent'
import { getShips } from './ships';
import { getMyContracts, acceptContract } from './contracts';
import { file, serve } from 'bun';

type Router = {
  [index: string]: Function
}

type PostRequestBody = {
  target: string
  arguments: any[]
}

const routes: Router = {
  "/agent":  getAgentDetails,
  "/ships": getShips,
  "/contracts": getMyContracts,
  "/contracts/accept": acceptContract
}


serve({
  port: 3000,

  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;
    
    if(pathname === "/" ) {
      return new Response(file("public/index.html"), {
        status: 200,
        headers: {
          "content-type": "text/html"
        }
      })
    } else if (pathname === "/favicon.ico") {
      return new Response(file("public/favicon.ico"), {
        status: 200,
      })
    } else if (pathname === "/dist/index.js") {
      return new Response(file("dist/index.js"), {
        status: 200,
        headers: {
          "content-type": "text/javascript"
        }
      })
    } else if (pathname === "/dist/output.css") {
      return new Response(file("dist/output.css"), {
        status: 200,
        headers: {
          "content-type": "text/css"
        }
      })
    }
    else {
      const routeFunction = routes[pathname];
      let response;
      
      if (req.method !== "GET") {
        const body: PostRequestBody = await req.json()
        console.log(body);
        response = await routeFunction(...body.arguments)
      } else {
        response = await routeFunction();
      }

      return new Response(JSON.stringify(response), {
        headers: {
          "content-type": "application/json"
        }
      })
    }

    // return new Response('{"message": couldn\'t find this url}', {
    //   status: 404,
    //   headers: {
    //     "content-type": "application/json"
    //   }
    // })
  }
})