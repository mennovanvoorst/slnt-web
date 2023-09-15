import { Playlist } from "@interfaces/playlist";
import playlist from "@models/playlist";

const fetchAllForUser = async ({
  userId
}: {
  userId: number;
}): Promise<Playlist[] | null> => {
  const res = await playlist.findAllForUser(userId);

  if (!res) return [];

  return res;
};

const createOrUpdate = async ({
  pl
}: {
  pl: Playlist;
}): Promise<Playlist | null> => {
  let res;

  if (pl.id) {
    res = await playlist.update(pl);
  } else {
    res = await playlist.create(pl);
  }

  return res;
};

const remove = async ({
  playlistId
}: {
  playlistId: string;
}): Promise<boolean | null> => await playlist.remove(playlistId);

export default {
  fetchAllForUser,
  createOrUpdate,
  remove
};
