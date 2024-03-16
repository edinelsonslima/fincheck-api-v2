import { ICategory } from '@interfaces/category';
import { ICategoryFactory, categoryFactory } from '@mappers/category';
import { IDatabase, db } from 'database';

class CategoryRepository {
  constructor(
    private readonly db: IDatabase,
    private readonly factory: ICategoryFactory
  ) {}

  public async findAllByUserId(userId: string) {
    const result = await this.db.query<ICategory>`
      SELECT * FROM categories
      WHERE user_id = ${userId}
    `;

    return this.factory.toArray(result);
  }
}

export type ICategoryRepository = InstanceType<typeof CategoryRepository>;
export const categoryRepository = new CategoryRepository(db, categoryFactory);
