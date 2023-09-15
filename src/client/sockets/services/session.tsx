import { Socket } from "socket.io-client";
import { Session } from "@interfaces/session";

export const createSession = (socket: Socket, payload: Session): void => {
  socket.emit("action", { type: "createSession", payload });
};

export const stopSession = (socket: Socket, sessionId: number): void => {
  if (!sessionId) return;

  socket.emit("action", {
    type: "stopSession",
    payload: { sessionId }
  });
};

export const joinSession = (socket: Socket, sessionId: string): void => {
  if (!sessionId) return;

  socket.emit("action", {
    type: "joinSession",
    payload: { sessionId }
  });
};

export const fetchSession = (
  socket: Socket,
  sessionId: string | null
): void => {
  socket.emit("action", { type: "fetchSession", payload: { sessionId } });
};

export const updateSession = (
  socket: Socket,
  sessionId: number,
  payload: Session
): void => {
  if (!sessionId) return;

  socket.emit("action", {
    type: "updateSession",
    payload: { ...payload, sessionId }
  });
};

export const resyncSession = (
  socket: Socket,
  sessionId: string | null
): void => {
  socket.emit("action", { type: "resyncSession", payload: { sessionId } });
};
