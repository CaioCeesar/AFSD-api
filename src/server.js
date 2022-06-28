import Hapi from "@hapi/hapi";
import { apiRoutes } from "./api-routes.js";
import { db } from "./models/db.js";
import jwt from "hapi-auth-jwt2";
import dotenv from "dotenv";
import { validate } from "./jwt-utils.js";

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
}

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 4000,
        //port: 4000,
        routes: { cors: true },
      });

      await server.register(jwt);

      server.auth.strategy("jwt", "jwt", {
        key: process.env.cookie_password,
        validate: validate,
        verifyOptions: { algorithms: ["HS256"] },
      });
    

    db.init("mongo");
    server.route(apiRoutes);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();