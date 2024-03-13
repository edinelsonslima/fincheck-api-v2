import { enBankAccountType } from '@enums/bank-account';
import { ITransaction } from './transaction';
import { IUser } from './user';

export interface IBankAccount {
  id: string;
  userId: string;
  initialBalance: number;
  name: string;
  color: string;
  type: enBankAccountType;

  created_at: Date;
  updated_at: Date;

  user: IUser;
  transactions: ITransaction[];
}
