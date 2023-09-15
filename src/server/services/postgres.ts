import { Pool as PgPool, PoolConfig, QueryResult } from "pg";
import config from "@config";

const connectionConfig: PoolConfig = {
  user: config.db.user,
  host: config.db.host,
  password: config.db.password,
  database: config.db.name,
  port: config.db.port,
  max: 10,
  idleTimeoutMillis: 30000
};

const pool = new PgPool(connectionConfig);

const execQuery = async (query: string, values?: unknown[]): Promise<any[]> => {
  try {
    let res: QueryResult;

    if (values) res = await pool.query(query, values);
    else res = await pool.query(query);

    return res.rows;
  } catch (e: any) {
    console.error(e);
    return null;
  }
};

export default {
  execQuery
};
