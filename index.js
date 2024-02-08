import dotenv from "dotenv";
import http from "http";
import { ROUTES } from "./src/api.js";
import { handlerGet } from './src/handlerGet.js'
import { handlerPost } from './src/handlerPost.js'
import {handlerPut} from './src/handlePut.js'

dotenv.config();

const PORT = process.env.PORT || 4000;
const BASE_URL = process.env.BASE_URL;

//create our server object
const server = http.createServer();

server.on("request", (request, response) => {
  // handle request based on method then URL
  switch (request.method) {
    case "GET":
        handlerGet(request, response)
      break;

    case "POST":
      if (request.url === `/${BASE_URL}${ROUTES.USERS}`) {
        handlerPost(request, response)
      } else {
        response.statusCode = 404;
        response.write("Not avaliable endpoint");
        response.end();
      }
      
      break;

    case "PUT":
      handlerPut(request, response)
      break;

    case "DELETE":
      break;

    default:
      // Send response for requests with no other response
      response.statusCode = 400;
      response.write("No Response");
      response.end();
  }
});

// get the server to start listening
server.listen(PORT, (err) => {
  // error checking
  err ? console.error(err) : console.log(`listening on port ${PORT}`);
});
