import postgres from "@services/postgres";
import { Playlist } from "@interfaces/playlist";
import niceware from "niceware";

const findAllForUser = async (userId: number): Promise<Playlist[] | null> => {
  const res = await postgres.execQuery(
    `SELECT * FROM playlists WHERE user_id=($1)`,
    [userId]
  );

  if (!res || res.length === 0) return null;

  return res;
};

const create = async (playlist: Playlist): Promise<Playlist | null> => {
  const id = niceware.generatePassphrase(6).join("-");
  const p = { ...playlist, id };

  const res = await postgres.execQuery(
    "INSERT INTO playlists(id, user_id, videos, title, duration) VALUES($1, $2, $3, $4, $5) RETURNING *",
    [p.id, p.user_id, p.videos, p.title, p.duration]
  );

  if (!res || res.length === 0) return null;

  return res[0];
};

const update = async (playlist: Playlist): Promise<Playlist | null> => {
  const res = await postgres.execQuery(
    "UPDATE playlists SET videos=($2), title=($3), duration=($4) WHERE id=($1) returning *",
    [playlist.id, playlist.videos, playlist.title, playlist.duration]
  );

  if (!res || res.length === 0) return null;

  return res[0];
};

const remove = async (playlistId: string): Promise<boolean | null> => {
  const res = await postgres.execQuery("DELETE FROM playlists WHERE id=($1)", [
    playlistId
  ]);

  if (!res) return null;

  return true;
};

const removeForUser = async (userId: number): Promise<boolean | null> => {
  const res = await postgres.execQuery(
    "DELETE FROM playlists WHERE user_id=($1)",
    [userId]
  );

  if (!res) return null;

  return true;
};

export default {
  findAllForUser,
  update,
  create,
  remove,
  removeForUser
};
