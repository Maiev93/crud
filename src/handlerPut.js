import { validate } from "uuid";
import dotenv from "dotenv";
import { ROUTES } from "./api.js";
import { DATABASE } from "./db.js";

dotenv.config();
const BASE_URL = process.env.BASE_URL;

export const handlerPut = function (request, response) {
  const currentID = request.url.split("/")[3];

  switch (request.url) {
    case `/${BASE_URL}${ROUTES.USERS}/${currentID}`:
      if (!validate(currentID)) {
        response.statuscode = 400;
        response.write("Id is not correct. Uuid is required");
        response.end();
      } else {
        const user = DATABASE.getUser(currentID);
        if (user) {
          let body = "";
          request.on("data", function (data) {
            body = JSON.parse(data.toString());
          });

          request.on("end", function () {
            const condition =
              Object.hasOwn(body, "username") &&
              Object.hasOwn(body, "age") &&
              Object.hasOwn(body, "hobbies") &&
              Array.isArray(body.hobbies) &&
              Number.isInteger(body.age);

            if (condition) {
              body = {
                id: currentID,
                ...body,
              };
              DATABASE.changeUser(body);
              response.statusCode = 200;
              response.setHeader("Content-Type", "application/json");
              response.write(JSON.stringify(body));
              response.end();
            } else {
              response.statusCode = 400;
              response.write(
                "Incorrect user data. You should send username, age (type Number) and hobby (type Array)"
              );
              response.end();
            }
          });
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
