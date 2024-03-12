import { ConnectionPool } from 'mssql';

declare global {
  namespace Express {
    interface Request {
      db: ConnectionPool;
      userId: string;
    }
  }
}
