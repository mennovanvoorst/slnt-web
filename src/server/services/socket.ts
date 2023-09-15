import { Server, Socket } from "socket.io";
import { Action } from "@interfaces/sockets";

const join = (socket, sessionId): void => {
  if (!sessionId) return;

  socket.join(sessionId.toString());
};

const leave = (socket, sessionId): void => {
  if (!sessionId) return;

  socket.leave(sessionId.toString());
};

const emitToClient = (socket: Socket, { type, payload }: Action) => {
  socket.emit("action", { type, payload });
};

const emitToSession = (
  socket: Socket,
  { sessionId, type, payload }: Action
) => {
  socket.to(sessionId.toString()).emit("action", { type, payload });
};

const emitToAllSession = (io: Server, { sessionId, type, payload }: Action) => {
  io.to(sessionId.toString()).emit("action", { type, payload });
};

export default {
  join,
  leave,
  emitToClient,
  emitToAllSession,
  emitToSession
};
