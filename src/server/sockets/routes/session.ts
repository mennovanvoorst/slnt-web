import { EventProps } from "@interfaces/sockets";
import session from "@services/session";
import sockets from "@services/socket";

const createSession = async ({
  io,
  socket,
  payload
}: EventProps): Promise<void> => {
  if (!("passport" in socket.request.session)) return;

  const userId = socket.request.session.passport.user;

  const initialSession = { ...payload, hosts: [userId] };
  const ses = await session.create({ initialSession });

  sockets.emitToAllSession(io, {
    type: "sessionCreated",
    sessionId: ses.hosts[0],
    payload: ses
  });
};

const fetchSession = async ({ socket, payload }: EventProps): Promise<void> => {
  let { sessionId } = payload;

  if (!sessionId) sessionId = socket.request.session.passport.user;

  const ses = await session.fetch({ sessionId });

  sockets.emitToClient(socket, { type: "sessionFetched", payload: ses });
};

const stopSession = async ({ io, payload }: EventProps): Promise<void> => {
  const { sessionId } = payload;

  const ses = await session.stop({ sessionId });

  sockets.emitToAllSession(io, {
    type: "sessionStopped",
    sessionId,
    payload: ses
  });
};

const joinSession = async ({ socket, payload }: EventProps): Promise<void> => {
  const { sessionId } = payload;

  const ses = await session.join({ socket, sessionId });

  sockets.emitToClient(socket, { type: "sessionJoined", payload: ses });
};

const leaveSession = async ({ socket, payload }: EventProps): Promise<void> => {
  const { sessionId } = payload;

  const ses = await session.leave({ socket, sessionId });

  sockets.emitToClient(socket, { type: "sessionLeft", payload: ses });
};

const updateSession = async ({
  socket,
  payload
}: EventProps): Promise<void> => {
  const { sessionId, isActive } = payload;
  if (!isActive) return;

  const ses = await session.update({ ses: payload });

  sockets.emitToSession(socket, {
    type: "sessionUpdated",
    sessionId,
    payload: ses
  });
};

const sessionResync = async ({ io, payload }: EventProps): Promise<void> => {
  const { sessionId } = payload;

  const ses = await session.fetch({ sessionId });

  sockets.emitToAllSession(io, {
    type: "sessionResynced",
    sessionId,
    payload: ses
  });
};

const sessionAddSong = async ({ io, payload }: EventProps): Promise<void> => {
  const { sessionId, video } = payload;

  const ses = await session.addSong({ sessionId, video });

  sockets.emitToAllSession(io, {
    type: "sessionUpdated",
    sessionId,
    payload: ses
  });
};

export default {
  createSession,
  stopSession,
  joinSession,
  fetchSession,
  updateSession,
  sessionResync,
  sessionAddSong,
  leaveSession
};
