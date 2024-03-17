import { ICategoryMapperPersistence } from '@interfaces/category';
import { ICategoryMapper, categoryMapper } from '@mappers/category';
import { IDatabase, db } from 'database';

class CategoryRepository {
  constructor(
    private readonly db: IDatabase,
    private readonly mapper: ICategoryMapper
  ) {}

  public async findAllByUserId(userId: string) {
    const result = await this.db.query<ICategoryMapperPersistence>`
      SELECT * FROM categories
      WHERE user_id = ${userId}
    `;

    return this.mapper.toArray(result);
  }
}

export type ICategoryRepository = InstanceType<typeof CategoryRepository>;
export const categoryRepository = new CategoryRepository(db, categoryMapper);
