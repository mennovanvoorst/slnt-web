import { Router } from "express";
import axios from "axios";

const route = Router();

export default (app: Router): void => {
  app.use("/v1/youtube", route);

  route.get("/channelFromVideoId", async (req, res) => {
    const { videoId } = req.query as any;
    return;

    const channelRegex = /"ownerChannelName":"(.*?)"/;

    const result = await axios.get(
      `https://www.youtube.com/watch?v=${videoId}`,
      {
        headers: {
          Cookie:
            "CONSENT=YES+srp.gws-20211208-0-RC2.en+FX+309; YSC=Kw9uF0Dh_E8; VISITOR_INFO1_LIVE=SrzhEbj3CpU; GPS=1"
        }
      }
    );

    const channelName = result.data.match(channelRegex);

    if (!channelName) return res.sendStatus(500);

    return res.status(200).json(channelName[1].toLowerCase());
  });
};
