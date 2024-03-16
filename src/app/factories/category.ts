import { ICategory } from '@interfaces/category';
import { IResult } from 'mssql';

class CategoryFactory {
  public toObject(queryResult: IResult<ICategory>) {
    const categories = this.getCategories(queryResult);

    if (!categories) {
      return undefined;
    }

    const [firstCategory] = categories;

    return {
      ...firstCategory,
    };
  }

  public toArray(queryResult: IResult<ICategory>) {
    const categories = this.getCategories(queryResult);
    return categories;
  }

  private getCategories(queryResult: IResult<ICategory>) {
    if (!queryResult.recordset?.length) {
      return undefined;
    }

    return queryResult.recordset.map(this.format);
  }

  private format(category: ICategory) {
    return {
      ...category,
      ...(category?.created_at && {
        created_at: new Date(category?.created_at),
      }),
      ...(category?.updated_at && {
        updated_at: new Date(category?.updated_at),
      }),
    };
  }
}

export type ICategoryFactory = InstanceType<typeof CategoryFactory>;
export const categoryFactory = new CategoryFactory();
