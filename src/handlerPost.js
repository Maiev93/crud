import { v4 as uuidv4 } from "uuid";
import { DATABASE } from "./db.js";

export const handlerPost = function (request, response) {
  let body = "";
  // use raw/JSON body in postman
  request.on("data", function (data) {
    body = JSON.parse(data.toString());
    console.log("DATA", body, typeof body);
  });

  request.on("end", function () {
    const condition =
      Object.hasOwn(body, "username") &&
      Object.hasOwn(body, "age") &&
      Object.hasOwn(body, "hobbies");

    if (condition) {
      body = {
        id: uuidv4(),
        ...body,
      };

      DATABASE.setUser(body);
      response.statusCode = 201;
      response.writeHead(201, { "Content-Type": "application/json" });
      response.write(JSON.stringify(body));
      response.end();
    } else {
      response.statusCode = 400;
      response.write(
        "Incorrect user data. You should send username, age and hobby (type Array)"
      );
      response.end();
    }
  });
};
