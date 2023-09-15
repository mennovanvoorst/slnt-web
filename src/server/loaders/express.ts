import { Application } from "express";
import { createServer, Server } from "http";
import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import config from "@config";
import routes from "@server/api";
import passport from "passport";
import cors from "cors";

export default ({
  app,
  session
}: {
  app: Application;
  session: any;
}): Server => {
  app.use(cookieParser());

  app.use(session);

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(
    cors({
      origin: [
        "http://localhost:3001",
        config.app_url,
        config.chrome_extension_url,
        config.firefox_extension_url,
        config.site_url,
        "https://www.youtube.com"
      ],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true
    })
  );

  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.use(config.api.prefix, routes());

  return createServer(app);
};
