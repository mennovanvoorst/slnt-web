import { Server, Socket } from "socket.io";

export interface Action {
  type: string;
  sessionId?: number;
  payload: any;
}

export interface EventHandlers {
  [key: string]: (payload, dispatch?) => void;
}

export interface EventProps {
  io: Server;
  socket: Socket;
  payload: any;
}

declare module "node:http" {
  interface IncomingMessage {
    session: any;
  }
}
