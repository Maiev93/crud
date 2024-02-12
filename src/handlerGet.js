import { validate } from "uuid";
import dotenv from "dotenv";
import { ROUTES } from "./api.js";
import { DATABASE } from "./db.js";

dotenv.config();
const BASE_URL = process.env.BASE_URL;

export const handlerGet = function (request, response) {
  if (request.url === "/favicon.ico") {
    console.log("The request made is:", request.url);
  }
  const currentID = request.url.split("/")[3];

  switch (request.url) {
    case `/${BASE_URL}${ROUTES.USERS}`:
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(DATABASE.getUser()));
      response.end();
      break;

    case `/${BASE_URL}${ROUTES.USERS}/${currentID}`:
      if (!validate(currentID)) {
        response.statuscode = 400;
        response.write("Id is not correct. Uuid is required");
        response.end();
      } else {
        const user = DATABASE.getUser(currentID);
        if (user) {
          response.statusCode = 200;
          response.setHeader("Content-Type", "application/json");
          response.write(JSON.stringify(user));
          response.end();
        } else {
          response.statuscode = 404;
          response.write("User not found");
          response.end();
        }
      }
      break;

    default:
      response.statusCode = 404;
      response.write("Not avaliable endpoint");
      response.end();
  }
};
