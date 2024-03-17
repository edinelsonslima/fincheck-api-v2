import { sanitizeObject } from '@helpers/sanitize-object';
import { snake2camel } from '@helpers/snake-to-camel';
import { ICategory, ICategoryMapperPersistence } from '@interfaces/category';
import { IResult } from 'mssql';

class CategoryMapper {
  public toObject(queryResult: IResult<ICategoryMapperPersistence>) {
    const categories = this.getCategories(queryResult);

    if (!categories) {
      return undefined;
    }

    const [firstCategory] = categories;

    return firstCategory;
  }

  public toArray(queryResult: IResult<ICategoryMapperPersistence>) {
    return this.getCategories(queryResult);
  }

  public toDomain(category: ICategoryMapperPersistence) {
    const parsed = sanitizeObject(snake2camel(category));
    return Object.keys(parsed).length ? parsed : undefined;
  }

  private getCategories(queryResult: IResult<ICategoryMapperPersistence>) {
    if (!queryResult.recordset?.length) {
      return undefined;
    }

    return queryResult.recordset.reduce((acc, data) => {
      const parsed = this.toDomain(data) as unknown as ICategory;
      return parsed ? [...acc, parsed] : acc;
    }, [] as ICategory[]);
  }
}

export type ICategoryMapper = InstanceType<typeof CategoryMapper>;
export const categoryMapper = new CategoryMapper();
