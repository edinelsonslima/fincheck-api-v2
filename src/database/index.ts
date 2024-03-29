import { ConnectionError, ConnectionPool } from 'mssql';

import { env } from 'app/settings';
import { tables } from './tables';

class Database {
  constructor(private connection: ConnectionPool) {}

  public async initialize() {
    if (this.isInitialized) {
      console.log('connection already been established');
      return;
    }

    const pool = await this.connection.connect();
    this.connection = pool;
    pool.query(tables.join('\n'));
  }

  /**
   * @doc https://www.npmjs.com/package/mssql#es6-tagged-template-literals
   */
  public async query<T>(query: TemplateStringsArray, ...inputs: any[]) {
    if (!this.isInitialized) {
      throw new ConnectionError('query failed, connection is not established');
    }

    return this.connection.query<T>(query, ...inputs);
  }

  private get isInitialized() {
    return this.connection.connected;
  }
}

const connection = new ConnectionPool({
  requestTimeout: 600_000,
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
});

export type IDatabase = InstanceType<typeof Database>;
export const db = new Database(connection);
