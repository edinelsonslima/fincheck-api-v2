import { enTransactionType } from '@enums/transaction';
import { ITransaction } from './transaction';
import { IUser } from './user';

export interface ICategory {
  id: string;
  userId: string;
  name: string;
  icon: string;
  type: enTransactionType;

  created_at: Date;
  updated_at: Date;

  user: IUser;
  transactions?: ITransaction[];
}
