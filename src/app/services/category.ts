import {
  ICategoryRepository,
  categoryRepository,
} from '@repositories/category';

class CategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async findAllByUserId(userId: string) {
    const categories = await this.categoryRepository.findAllByUserId(userId);

    if (!categories) {
      throw new Error('No categories found');
    }

    return categories;
  }
}

export type ICategoryService = InstanceType<typeof CategoryService>;
export const categoryService = new CategoryService(categoryRepository);
