import { Router } from "express";
import passport from "passport";
import config from "@config";
import { unlinkProvider, updateToken } from "@services/passport";
import authenticated from "../middlewares/authenticated";
import refresh from "passport-oauth2-refresh";
import { add, isPast } from "date-fns";

const route = Router();

export default (app: Router): void => {
  app.use("/v1/auth", route);

  route.get("/authenticate/twitch", passport.authenticate("twitch"));
  route.get(
    "/authenticate/twitch/callback",
    passport.authenticate("twitch", {
      successRedirect: config.app_url,
      failureRedirect: ""
    })
  );

  route.get("/authenticate/youtube", passport.authenticate("youtube"));
  route.get(
    "/authenticate/youtube/callback",
    passport.authenticate("youtube", {
      successRedirect: config.app_url,
      failureRedirect: ""
    })
  );

  route.get("/authenticate/spotify", passport.authenticate("spotify"));
  route.get(
    "/authenticate/spotify/callback",
    passport.authenticate("spotify", {
      successRedirect: config.app_url,
      failureRedirect: ""
    })
  );

  route.get("/authenticate/spotify/token", authenticated, async (req, res) => {
    if (isPast(new Date(req.user.providers["spotify"].expiresIn))) {
      refresh.requestNewAccessToken(
        "spotify",
        req.user.providers["spotify"].refreshToken,
        async (err, accessToken, refreshToken) => {
          if (err) console.log(err);

          await updateToken(
            req,
            accessToken,
            add(new Date(), { seconds: 3600 }),
            "spotify"
          );

          return res.status(200).json({ token: accessToken });
        }
      );
    } else {
      return res
        .status(200)
        .json({ token: req.user.providers["spotify"].token });
    }
  });

  route.get("/unlink/youtube", authenticated, async (req, res) => {
    await unlinkProvider(req, "youtube");

    return res.status(200).json({ success: true });
  });

  route.get("/unlink/twitch", authenticated, async (req, res) => {
    await unlinkProvider(req, "twitch");

    return res.status(200).json({ success: true });
  });

  route.get("/unlink/spotify", authenticated, async (req, res) => {
    await unlinkProvider(req, "spotify");

    return res.status(200).json({ success: true });
  });

  route.get("/logout", (req, res) => {
    req.logout();

    res.sendStatus(200);
  });
};
