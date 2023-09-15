import { Router } from "express";
import authenticated from "../middlewares/authenticated";
import playlist from "@services/playlist";

const route = Router();

export default (app: Router): void => {
  app.use("/v1/playlists", route);

  route.get("/user", authenticated, async (req, res) => {
    const playlists = await playlist.fetchAllForUser({ userId: req.user.id });

    return res.status(200).json(playlists);
  });

  route.post("/update", authenticated, async (req, res) => {
    const pl = req.body;
    pl.user_id = req.user.id;

    const p = await playlist.createOrUpdate({ pl });

    return res.status(200).json(p);
  });

  route.post("/delete", authenticated, async (req, res) => {
    const { id } = req.body;

    await playlist.remove({ playlistId: id });

    return res.sendStatus(200);
  });
};
