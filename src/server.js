import Hapi from "@hapi/hapi";
import jwt from "hapi-auth-jwt2";
import dotenv from "dotenv";
import Vision from "@hapi/vision";
import HapiSwagger from "hapi-swagger";
import Inert from "@hapi/inert";
import { validate } from "./jwt-utils.js";
import { apiRoutes } from "./api-routes.js";
import { db } from "./models/db.js";


const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
}

const swaggerOptions = {
  info: {
    title: "Travel Share API",
    version: "1.0"
  },
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "Authorization",
      in: "header"
    }
  },
  security: [{ jwt: [] }]
};

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 4000,
        routes: { cors: true },
      });

      await server.register(jwt);
      await server.register(Vision);
      await server.register([
        Inert,
        Vision,
        {
          plugin: HapiSwagger,
          options: swaggerOptions
        }
      ]);

      server.auth.strategy("jwt", "jwt", {
        key: process.env.cookie_password,
        validate: validate,
        verifyOptions: { algorithms: ["HS256"] },
      });
    

    db.init("mongo");
    server.route(apiRoutes);
    await server.start();
    console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {

    console.log(err);
    process.exit(1);
});

init();