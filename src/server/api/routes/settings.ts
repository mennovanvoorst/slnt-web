import { Router } from "express";
import settings from "@services/settings";
import authenticated from "../middlewares/authenticated";
import playlist from "@services/playlist";

const route = Router();

export default (app: Router): void => {
  app.use("/v1/settings", route);

  route.get("/filter", async (req, res) => {
    const { key, value } = req.query as any;

    const s = await settings.filter({ key, value });

    return res.status(200).json(s);
  });
};
