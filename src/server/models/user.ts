import postgres from "@services/postgres";
import { Providers, User } from "@interfaces/user";

const findById = async (id: string): Promise<User | null> => {
  const res = await postgres.execQuery(`SELECT * FROM users WHERE id=($1)`, [
    id
  ]);

  if (!res || res.length === 0) return null;

  const user: User = {
    id: res[0].id,
    name: res[0].name,
    avatar: res[0].avatar,
    provider: res[0].provider,
    providers: res[0].providers
  };

  return user;
};

const findByIds = async (ids: number[]): Promise<User[] | null> => {
  const res = await postgres.execQuery(
    `SELECT * FROM users WHERE id=ANY(ARRAY[($1)::INTEGER[]])`,
    [ids]
  );

  if (!res || res.length === 0) return null;

  return res;
};

const findByChannelname = async (
  provider: string,
  channelname: string
): Promise<User | null> => {
  const res = await postgres.execQuery(
    `SELECT * FROM users WHERE providers->'${provider}'->>'displayName'=($1)`,
    [channelname.toLowerCase()]
  );

  if (!res || res.length === 0) return null;

  return res[0];
};

const findByExternalId = async (
  id: string,
  provider: keyof Providers
): Promise<User | null> => {
  const res = await postgres.execQuery(
    `SELECT * FROM users WHERE providers->'${provider}'->>'id'=($1)`,
    [id]
  );

  if (!res || res.length === 0) return null;

  const user: User = {
    id: res[0].id,
    name: res[0].name,
    avatar: res[0].avatar,
    provider: res[0].provider,
    providers: res[0].providers
  };

  return user;
};

const create = async ({
  name,
  avatar,
  provider,
  providers
}: {
  name: string;
  avatar: string;
  provider: string;
  providers: Providers;
}): Promise<User | null> => {
  const res = await postgres.execQuery(
    "INSERT INTO users(name, providers, avatar, provider) VALUES($1, $2, $3, $4) RETURNING *",
    [name, providers, avatar, provider]
  );

  if (!res || res.length === 0) return null;

  const user: User = {
    id: res[0].id,
    name: res[0].name,
    avatar: res[0].avatar,
    provider: res[0].provider,
    providers: res[0].providers
  };

  return user;
};

const save = async ({
  id,
  name,
  avatar,
  provider,
  providers
}: User): Promise<User | null> => {
  const res = await postgres.execQuery(
    `UPDATE users SET name=($1), providers=($2), provider=($3) WHERE id=($4)`,
    [name, providers, provider, id]
  );

  if (!res) return null;

  return {
    id,
    name,
    avatar,
    provider,
    providers
  };
};

const destroy = async (id: number): Promise<any> =>
  await postgres.execQuery(`DELETE FROM users WHERE id=($1)`, [id]);

export default {
  findById,
  findByIds,
  findByExternalId,
  create,
  save,
  findByChannelname,
  destroy
};
