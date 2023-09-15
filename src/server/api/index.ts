import { Router } from "express";
import user from "./routes/user";
import auth from "./routes/auth";
import video from "./routes/video";
import playlist from "./routes/playlist";
import settings from "./routes/settings";
import youtube from "./routes/youtube";

export default (): Router => {
  const app = Router();

  auth(app);
  user(app);
  video(app);
  playlist(app);
  settings(app);
  youtube(app);

  return app;
};
