import dotenv from "dotenv";
import http from "http";
import { handlerGet } from './src/handlerGet.js'
import {handlerPost} from './src/handlerPost.js'

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
      handlerPost(request, response)
      break;

    case "PUT":
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
