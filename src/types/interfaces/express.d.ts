import { Request, Response } from 'express';
import { ConnectionPool } from 'mssql';

declare global {
  namespace Express {
    interface Request {
      db: ConnectionPool;
      userId: string;
    }
  }
}

export interface IRequest<TBody = unknown, TParams = unknown, TQuery = unknown>
  extends Request<TParams, any, TBody, TQuery> {}

export interface IResponse<TBody = unknown>
  extends Response<TBody | { message: string }> {}
