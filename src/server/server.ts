import { getAgentDetails } from './agentDetails'
import { file, serve } from 'bun';

type Router = {
  [index: string]: Function
}

const routes: Router = {
  "/agent":  getAgentDetails
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
      console.log(routeFunction);
      const response = await routeFunction();

      console.log('htmlLoad: ', response);

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