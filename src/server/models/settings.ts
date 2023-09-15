import postgres from "@services/postgres";
import { Settings } from "@interfaces/settings";

const findByKeyValue = async (
  key: string,
  value: string
): Promise<Settings | null> => {
  const res = await postgres.execQuery(
    `SELECT user_id FROM user_settings WHERE settings->>'${key}'=($1)`,
    [value]
  );

  if (!res || res.length === 0) return null;

  return res;
};

const findByUserId = async (userId: number): Promise<Settings | null> => {
  const res = await postgres.execQuery(
    `SELECT * FROM user_settings WHERE user_id=($1)`,
    [userId]
  );

  if (!res || res.length === 0) return null;

  return res[0];
};

const updateByUserId = async (
  settings: Settings,
  userId: number
): Promise<boolean> => {
  await postgres.execQuery(
    "INSERT INTO user_settings(user_id, settings) VALUES($1, $2) ON CONFLICT (user_id) DO UPDATE SET user_id = excluded.user_id, settings = excluded.settings",
    [userId, settings]
  );

  return true;
};

const findKeyByUserId = async (
  userId: number,
  key: string
): Promise<Settings | null> => {
  const res = await postgres.execQuery(
    `SELECT settings->'${key}' as ${key} FROM user_settings WHERE user_id=($1)`,
    [userId]
  );

  if (!res || res.length === 0) return null;

  return res[0];
};

const removeForUser = async (userId: number): Promise<boolean | null> => {
  const res = await postgres.execQuery(
    "DELETE FROM user_settings WHERE user_id=($1)",
    [userId]
  );

  if (!res) return null;

  return true;
};

export default {
  findByUserId,
  findKeyByUserId,
  findByKeyValue,
  updateByUserId,
  removeForUser
};
