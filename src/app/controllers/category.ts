import { ICategory } from '@interfaces/category';
import { IRequest, IResponse } from '@interfaces/express';
import { ICategoryService, categoryService } from '@services/category';

class CategoryController {
  constructor(private readonly categoryService: ICategoryService) {
    this.index = this.index.bind(this);
  }

  public async index(req: IRequest, res: IResponse<ICategory[]>) {
    try {
      const categories = await this.categoryService.findAllByUserId(req.userId);

      return res.status(200).json(categories);
    } catch (error: any) {
      const err: Error = error;
      return res.status(500).json({ message: err.message });
    }
  }
}

export type ICategoryController = InstanceType<typeof CategoryController>;
export const categoryController = new CategoryController(categoryService);
