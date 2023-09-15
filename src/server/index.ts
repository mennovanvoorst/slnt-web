import express from "express";
import config from "@config";

import session from "express-session";
import redisClient from "@services/redis";
import global from "@interfaces/global";

const RedisStore = require("connect-redis")(session);

const expressSession = session({
  store: new RedisStore({ client: redisClient }),
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
});

const startServer = async (): Promise<void> => {
  const app = express();

  const { server, io } = await require("./loaders").default({
    expressApp: app,
    expressSession
  });

  server
    .listen(config.port, () => {
      console.info(`Server listening on port ${config.port}`);
    })
    .on("error", (err: Error) => {
      console.error(err);
      process.exit(1);
    });
};
startServer();
