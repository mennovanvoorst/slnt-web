import { Application } from "express";
import { Server } from "http";
import { Server as SocketServer } from "socket.io";
import socketioLoader from "./socketio";
import expressLoader from "./express";
import passportLoader from "./passport";

export default async ({
  expressApp,
  expressSession
}: {
  expressApp: Application;
  expressSession: any;
}): Promise<{ server: Server; io: SocketServer }> => {
  await passportLoader({ app: expressApp });
  const server: Server = await expressLoader({
    app: expressApp,
    session: expressSession
  });
  const io: SocketServer = await socketioLoader({
    server,
    session: expressSession
  });

  return { io, server };
};
