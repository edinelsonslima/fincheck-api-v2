import { enTransactionType } from '@enums/transaction';

export interface ITransaction {
  id: string;
  userId: string;
  categoryId?: string;
  bankAccountId: string;
  name: string;
  value: number;
  date: Date;
  type: enTransactionType;

  createdAt: Date;
  updatedAt: Date;
}
