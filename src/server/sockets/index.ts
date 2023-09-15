import { EventHandlers } from "@interfaces/sockets";
import sessionHandler from "./routes/session";
import spotifyHandler from "./routes/spotify";

const handlers: EventHandlers = {
  ...sessionHandler,
  ...spotifyHandler
};

export default handlers;
