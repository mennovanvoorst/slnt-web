import { Server, Socket } from "socket.io";
import { Session } from "@interfaces/session";
import sockets from "@services/socket";
import session from "@models/session";
import { Video } from "@interfaces/video";
import settings from "@services/settings";

const create = async ({
  initialSession
}: {
  initialSession: Session;
}): Promise<Session | null> => {
  let ses = await session.find(initialSession.hosts[0]);

  if (ses) {
    await session.remove(initialSession.hosts[0]);
  }

  ses = await session.create(initialSession);

  console.info(`Created session for user ${initialSession.hosts[0]}`);

  return ses;
};

const fetch = async ({ sessionId }: { sessionId: number }): Promise<Session> =>
  await session.find(sessionId);

const stop = async ({ sessionId }: { sessionId: number }): Promise<Session> => {
  const ses = await session.find(sessionId);

  await session.remove(sessionId);

  console.info(`Stopped session ${sessionId}`);

  return { ...ses, isActive: false };
};

const join = async ({
  socket,
  sessionId
}: {
  socket: Socket;
  sessionId: number;
}): Promise<Session | null> => {
  const ses = await session.find(sessionId);

  sockets.join(socket, sessionId.toString());

  //console.info(`Socket joined session ${sessionId}`);
  return ses;
};

const leave = async ({
  socket,
  sessionId
}: {
  socket: Socket;
  sessionId: number;
}): Promise<Session> => {
  sockets.leave(socket, sessionId.toString());

  console.info(`Socket left session ${sessionId}`);

  return {
    isActive: false,
    hosts: [],
    playlist: [],
    isPlaying: true,
    delay: 0,
    timestamp: 0
  };
};

const update = async ({ ses }: { ses: Session }): Promise<Session | null> => {
  await session.save(ses);

  return ses;
};

const addSong = async ({
  sessionId,
  video
}: {
  sessionId: number;
  video: Video;
}): Promise<Session> => {
  const ses = await session.find(sessionId);
  let playlist = [...ses.playlist];

  const setting = await settings.fetchKeyForUser({
    userId: sessionId,
    key: "song_requests"
  });

  const priorityIndex = setting.priority.findIndex(
    (priority) => priority === video.priority
  );

  const higherPriorities = setting.priority.slice(0, priorityIndex);
  let lastPriorityIndex = -1;
  let index = 0;

  while (lastPriorityIndex === -1 && index <= higherPriorities.length) {
    if (index >= higherPriorities.length || lastPriorityIndex !== -1) {
      if (lastPriorityIndex === -1) {
        playlist = [...playlist, video];
      } else {
        playlist.splice(lastPriorityIndex + 1, 0, video);
      }
    } else {
      lastPriorityIndex = lastPriorityIndex = playlist
        .map((p) => p.priority)
        .lastIndexOf(higherPriorities.at(-1));
    }

    index++;
  }

  ses.playlist = playlist;

  await session.save(ses);
  return ses;
};

export default {
  create,
  stop,
  join,
  fetch,
  update,
  addSong,
  leave
};
