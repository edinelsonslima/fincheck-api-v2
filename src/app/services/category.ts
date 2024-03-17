import { enStatusCode } from '@enums/status-code';
import {
  ICategoryRepository,
  categoryRepository,
} from '@repositories/category';
import { CategoryError } from 'errors/category-error';

class CategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async findAllByUserId(userId: string) {
    const categories = await this.categoryRepository.findAllByUserId(userId);

    if (!categories) {
      throw new CategoryError('no categories found', enStatusCode.NOT_FOUND);
    }

    return categories;
  }
}

export type ICategoryService = InstanceType<typeof CategoryService>;
export const categoryService = new CategoryService(categoryRepository);
