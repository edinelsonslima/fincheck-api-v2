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
