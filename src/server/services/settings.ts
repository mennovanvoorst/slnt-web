import { Settings } from "@interfaces/settings";
import settings from "@models/settings";
import config from "@config";
import axios, { AxiosError, AxiosResponse } from "axios";

const updateBot = (provider: string, data: any): Promise<boolean> =>
  axios(`${config[provider].bot_url}/v1/user/settings`, {
    method: "post",
    data: { ...data },
    withCredentials: true
  })
    .then((res) => true)
    .catch((e: AxiosError) => {
      console.log(e);
      return false;
    });

const filter = async ({
  key,
  value
}: {
  key: string;
  value: string;
}): Promise<Settings | null> => {
  const res = await settings.findByKeyValue(key, value);

  if (!res) return [];

  return res;
};

const fetchForUser = async ({
  userId
}: {
  userId: number;
}): Promise<Settings | null> => {
  const res = await settings.findByUserId(userId);

  if (!res) return { settings: {}, user_id: userId };

  return res;
};

const update = async ({
  s,
  userId
}: {
  s: Settings;
  userId: number;
}): Promise<boolean | null> => {
  const res = await settings.updateByUserId(s, userId);

  return res;
};

const fetchKeyForUser = async ({
  userId,
  key
}: {
  userId: number;
  key: string;
}): Promise<Settings | null> => {
  const res = await settings.findKeyByUserId(userId, key);

  if (!res) return [];

  return res[key];
};

export default {
  filter,
  fetchForUser,
  fetchKeyForUser,
  update,
  updateBot
};
