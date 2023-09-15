import { createClient } from "redis";

const client = createClient();

client.on("error", (error) => {
  console.error(error);
});

export const getRedisValue = async (key: string): Promise<any> =>
  new Promise((resolve, reject) => {
    if (client === null) return reject(new Error("No redis connection"));

    client.get(key, (err, res) => {
      if (err) return reject(new Error(err));
      return resolve(res);
    });
  });

export const setRedisValue = async (key: string, value: any): Promise<any> =>
  new Promise((resolve, reject) => {
    if (client === null) return reject(new Error("No redis connection"));

    client.set(key, value, (err, res) => {
      if (err) return reject(new Error(err));

      return resolve(true);
    });
  });

export const removeRedisKey = async (key: string): Promise<any> => {
  if (client === null) return new Error("No redis connection");

  client.del(key);
};

export const getRedisObject = async (key: string): Promise<any> =>
  new Promise((resolve, reject) => {
    if (client === null) return reject(new Error("No redis connection"));

    client.get(key, (err, res) => {
      if (err) return reject(new Error(err));

      return resolve(JSON.parse(res));
    });
  });

export const setRedisObject = async (key: string, value: any): Promise<any> =>
  new Promise((resolve, reject) => {
    if (client === null) return reject(new Error("No redis connection"));

    client.set(key, JSON.stringify(value), (err, res) => {
      if (err) return reject(new Error(err));

      return resolve(true);
    });
  });

export default client;
