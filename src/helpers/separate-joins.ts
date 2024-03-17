import { IBankAccountMapperPersistence } from '@interfaces/bank-account';
import { ICategoryMapperPersistence } from '@interfaces/category';
import { ITransactionMapperPersistence } from '@interfaces/transaction';

interface ISchemaKeys {
  transaction: Array<keyof ITransactionMapperPersistence>;
  bankAccount: Array<keyof IBankAccountMapperPersistence>;
  category: Array<keyof ICategoryMapperPersistence>;
}

// prettier-ignore
const schemaKeys: ISchemaKeys = {
  transaction: ['id', 'user_id', 'category_id', 'bank_account_id', 'name', 'value', 'date', 'type', 'created_at', 'updated_at'],
  bankAccount: ['id', 'user_id', 'initial_balance', 'name', 'color', 'type', 'created_at', 'updated_at'],
  category: ['id', 'user_id', 'name', 'icon', 'type', 'created_at', 'updated_at'],
};

export function separateJoins<T extends object>(
  schema: keyof typeof schemaKeys,
  type: number,
  obj: T
) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (!schemaKeys[schema]?.includes(key as any)) {
      return acc;
    }

    return { ...acc, [key]: Array.isArray(value) ? value[type] : value };
  }, {} as T);
}
