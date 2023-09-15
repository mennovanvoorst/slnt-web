import { Session } from "@interfaces/session";
import {
  getRedisObject,
  getRedisValue,
  removeRedisKey,
  setRedisObject
} from "@services/redis";

const find = async (id: number): Promise<Session | null> => {
  const session = await getRedisObject(`session:${id}`);

  if (!session) return null;

  return session;
};

const create = async (initialSession: Session): Promise<Session> => {
  const ses = {
    isActive: true,
    hosts: initialSession.hosts,
    playlist: initialSession.playlist,
    isPlaying: initialSession.isPlaying,
    timestamp: initialSession.timestamp,
    delay: initialSession.delay
  };

  await setRedisObject(`session:${ses.hosts[0]}`, ses);

  return ses;
};

const save = async (ses: Session): Promise<void> => {
  await setRedisObject(`session:${ses.hosts[0]}`, ses);
};

const remove = async (id: number): Promise<void> => {
  await removeRedisKey(`session:${id}`);
};

export default {
  find,
  create,
  remove,
  save
};
