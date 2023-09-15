import { Server as SocketServer } from "socket.io";
import { Server } from "http";
import { Action, EventProps } from "@interfaces/sockets";
import eventHandlers from "@server/sockets";
import config from "@config";

export default ({
  server,
  session
}: {
  server: Server;
  session: any;
}): SocketServer => {
  const io: SocketServer = new SocketServer(server, {
    cors: {
      origin: [
        "http://localhost:3001",
        config.app_url,
        config.chrome_extension_url,
        config.firefox_extension_url
      ],
      methods: ["GET", "POST"],
      credentials: true
    },
    pingTimeout: 10000,
    pingInterval: 30000
  });

  console.info("Socket.IO server has been initialized");

  io.use((socket, next) => {
    session(socket.request, {}, next);
  });

  io.on("connection", (socket) => {
    //console.info(`socket ${socket.id} connected to the server`);

    socket.on("action", async (action: Action) => {
      const eventHandler: (payload: EventProps) => void =
        eventHandlers[action.type];

      if (typeof eventHandler === "function")
        eventHandler({
          io,
          socket,
          payload: "payload" in action ? action.payload : {}
        });
    });
  });
  return io;
};
