import { enTransactionType } from '@enums/transaction';
import { IBankAccount } from './bank-account';
import { ICategory } from './category';
import { IUser } from './user';

export interface ITransaction {
  id: string;
  userId: string;
  categoryId?: string;
  bankAccountId: string;
  name: string;
  value: number;
  date: Date;
  type: enTransactionType;

  created_at: Date;
  updated_at: Date;

  user: IUser;
  bankAccount: IBankAccount;
  category?: ICategory;
}
