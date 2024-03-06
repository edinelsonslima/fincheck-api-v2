/* eslint-disable no-console */
import { ConnectionPool, config as IConfig } from 'mssql';

import { env } from 'app/settings';

const config: IConfig = {
  user: env.DB_USER,
  password: env.DB_PASS,
  server: env.DB_SERVER,
  database: env.DB_DATABASE,
  port: env.DB_PORT,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

const db = new ConnectionPool({
  ...config,
  beforeConnect: (conn) => {
    conn.on('connect', () => console.log('🔗 database connected'));
  },
});

export { db };
