import { Router } from "express";
import authenticated from "../middlewares/authenticated";
import playlist from "@services/playlist";
import user from "@services/user";
import settings from "@services/settings";

const route = Router();

export default (app: Router): void => {
  app.use("/v1/user", route);

  route.get("/auth", authenticated, (req, res) => {
    return res.status(200).json(req.user);
  });

  route.get("/fetch/:userId", async (req, res) => {
    const { userId } = req.params as any;

    const u = await user.fetchById({ id: userId });

    return res.status(200).json(u);
  });

  route.get("/all", async (req, res) => {
    const { users } = req.query as any;

    const u = await user.fetchMultiple({ users });

    return res.status(200).json(u);
  });

  route.get("/getByProviderName", async (req, res) => {
    const { channelname, provider } = req.query as any;

    const u = await user.fetchByProviderChannel({ provider, channelname });

    return res.status(200).json(u);
  });

  route.get("/settings", authenticated, async (req, res) => {
    const { id } = req.user as any;

    const u = await settings.fetchForUser({ userId: id });

    return res.status(200).json(u);
  });

  route.post("/settings/update", authenticated, async (req, res) => {
    const s = req.body;
    const userId = req.user.id;

    await settings.update({ s, userId });

    if ("twitch" in req.user.providers) {
      await settings.updateBot("twitch", {
        channelName: req.user.providers.twitch.displayName,
        channelId: req.user.providers.twitch.id,
        userId: userId,
        settings: s
      });
    }

    if ("youtube" in req.user.providers) {
      await settings.updateBot("youtube", {
        channelName: req.user.providers.youtube.displayName,
        channelId: req.user.providers.youtube.id,
        userId: userId,
        settings: s
      });
    }

    return res.sendStatus(200);
  });

  route.get("/:userId/settings", async (req, res) => {
    const { userId } = req.params as any;

    const u = await settings.fetchForUser({ userId });

    return res.status(200).json(u);
  });

  route.post("/delete", authenticated, async (req, res) => {
    const userId = req.user.id;

    await user.deleteAllData({ userId });

    return res.sendStatus(200);
  });
};
