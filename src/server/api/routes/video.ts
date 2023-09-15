import { Router } from "express";
import video from "@services/video";
import { Video } from "@interfaces/video";

const route = Router();

export default (app: Router): void => {
  app.use("/v1/video", route);

  route.get("/search", async (req, res) => {
    const { search, type } = req.query as any;

    try {
      const results: Video[] = await video.search(search);

      return res.status(200).json(results);
    } catch (e) {
      return res.sendStatus(500);
    }
  });

  route.get("/fetch/:videoId", async (req, res) => {
    const { videoId } = req.params as any;

    try {
      const result = await video.fetch(videoId);

      return res.status(200).json(result);
    } catch (e) {
      return res.sendStatus(500);
    }
  });

  route.get("/playlist/:playlistId", async (req, res) => {
    const { playlistId } = req.params as any;

    try {
      const result = await video.fetchPlaylist(playlistId);

      return res.status(200).json(result);
    } catch (e) {
      return res.sendStatus(500);
    }
  });

  route.get("/playlist/items/:playlistId", async (req, res) => {
    const { playlistId } = req.params as any;

    try {
      const result = await video.fetchPlaylistItems(playlistId);

      return res.status(200).json(result);
    } catch (e) {
      return res.sendStatus(500);
    }
  });
};
