import user from "@models/user";
import { User } from "@interfaces/user";
import playlist from "@models/playlist";
import settings from "@models/settings";

const fetchById = async ({ id }: { id: string }): Promise<User | null> => {
  const res = await user.findById(id);

  if (!res) return null;

  return res;
};

const fetchMultiple = async ({
  users
}: {
  users: number[];
}): Promise<User[] | null> => {
  const res = await user.findByIds(users);

  if (!res) return [];

  return res;
};

const fetchByProviderChannel = async ({
  provider,
  channelname
}: {
  provider: string;
  channelname: string;
}): Promise<User | null> => {
  const res = await user.findByChannelname(provider, channelname);

  if (!res) return null;

  return res;
};

const deleteAllData = async ({
  userId
}: {
  userId: number;
}): Promise<boolean> => {
  const p = playlist.removeForUser(userId);
  const us = settings.removeForUser(userId);
  const u = user.destroy(userId);

  return Promise.all([p, us, u]).then((values) => {
    return true;
  });
};

export default {
  fetchById,
  fetchMultiple,
  fetchByProviderChannel,
  deleteAllData
};
