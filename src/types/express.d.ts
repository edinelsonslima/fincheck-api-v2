/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { ConnectionPool } from 'mssql';

declare global {
  namespace Express {
    interface Request {
      db: ConnectionPool;
    }
  }
}
