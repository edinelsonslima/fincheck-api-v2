import { sanitizeObject } from '@helpers/sanitize-object';
import { snake2camel } from '@helpers/snake-to-camel';
import { ICategoryMapperPersistence } from '@interfaces/category';
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

  public toDomain(category: ICategoryMapperPersistence) {
    return sanitizeObject(snake2camel(category));
  }

  private getCategories(queryResult: IResult<ICategoryMapperPersistence>) {
    if (!queryResult.recordset?.length) {
      return undefined;
    }

    return queryResult.recordset.map(this.toDomain);
  }
}

export type ICategoryMapper = InstanceType<typeof CategoryMapper>;
export const categoryMapper = new CategoryMapper();
