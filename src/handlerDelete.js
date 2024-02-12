import { validate } from "uuid";
import dotenv from "dotenv";
import { ROUTES } from "./api.js";
import { DATABASE } from "./db.js";

dotenv.config();
const BASE_URL = process.env.BASE_URL;

export const handlerDelete = function (request, response) {
  const currentID = request.url.split("/")[3];

  if (request.url === `/${BASE_URL}${ROUTES.USERS}/${currentID}`) {
    if (!validate(currentID)) {
      response.statuscode = 400;
      response.write("Id is not correct. Uuid is required");
      response.end();
    } else {
      const user = DATABASE.getUser(currentID);
      if (user) {
        response.statusCode = 204;
        DATABASE.deleteUser(currentID);
        response.end();
      } else {
        response.statuscode = 404;
        response.write("User not found");
        response.end();
      }
    }
  } else {
    response.statusCode = 404;
    response.write("Not avaliable endpoint");
    response.end();
  }
};
