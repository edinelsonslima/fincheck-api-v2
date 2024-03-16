import { enTransactionType } from '@enums/transaction';
import {
  ICategoryMapperDomain,
  ICategoryMapperPersistence,
} from '@interfaces/category';
import { IResult } from 'mssql';

class CategoryFactory {
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

    return queryResult.recordset.map(this.format);
  }

  private format(category: ICategoryMapperPersistence): ICategoryMapperDomain {
    return {
      id: category.id,
      userId: category.user_id,
      name: category.name,
      icon: category.icon,
      type: category.type as enTransactionType,
      createdAt: new Date(category.created_at),
      updatedAt: new Date(category.updated_at),
    };
  }
}

export type ICategoryFactory = InstanceType<typeof CategoryFactory>;
export const categoryFactory = new CategoryFactory();
