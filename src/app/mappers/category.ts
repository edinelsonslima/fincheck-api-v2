import { enTransactionType } from '@enums/transaction';
import {
  ICategoryMapperDomain,
  ICategoryMapperPersistence,
} from '@interfaces/category';
import { IResult } from 'mssql';

class CategoryMapper {
  constructor() {
    this.toDomain = this.toDomain.bind(this);
  }

  public toObject(queryResult: IResult<ICategoryMapperPersistence>) {
    const categories = this.getCategories(queryResult);

    if (!categories) {
      return undefined;
    }

    const [firstCategory] = categories;

    return firstCategory;
  }

  public toArray(queryResult: IResult<ICategoryMapperPersistence>) {
    const categories = this.getCategories(queryResult);
    return categories;
  }

  private getCategories(queryResult: IResult<ICategoryMapperPersistence>) {
    if (!queryResult.recordset?.length) {
      return undefined;
    }

    return queryResult.recordset.map(this.toDomain);
  }

  private toDomain(category: ICategoryMapperPersistence) {
    return this.sanitizeObject<ICategoryMapperDomain>({
      id: category.id,
      userId: category.user_id,
      name: category.name,
      icon: category.icon,
      type: category.type as enTransactionType,
      createdAt: new Date(category.created_at),
      updatedAt: new Date(category.updated_at),
    });
  }

  private sanitizeObject<T extends object>(obj: T) {
    const invalid = ['', 'undefined', 'null', 'Invalid Date', 'NaN'];
    const entries = Object.entries(obj);
    const cleared = entries.filter(([, v]) => !invalid.includes(String(v)));
    return Object.fromEntries(cleared) as T;
  }
}

export type ICategoryMapper = InstanceType<typeof CategoryMapper>;
export const categoryMapper = new CategoryMapper();
