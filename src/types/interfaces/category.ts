import { enTransactionType } from '@enums/transaction';

export interface ICategory {
  id: string;
  userId: string;
  name: string;
  icon: string;
  type: enTransactionType;

  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryMapperPersistence {
  id: string;
  user_id: string;
  name: string;
  icon: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface ICategoryMapperDomain extends ICategory {}
