import { ICategory } from '@interfaces/category';
import { IRequest, IResponse } from '@interfaces/express';
import { ICategoryService, categoryService } from '@services/category';

class CategoryController {
  constructor(private readonly categoryService: ICategoryService) {
    this.index = this.index.bind(this);
  }

  public async index(req: IRequest, res: IResponse<ICategory[]>) {
    const categories = await this.categoryService.findAllByUserId(req.userId);
    return res.status(200).json(categories);
  }
}

export type ICategoryController = InstanceType<typeof CategoryController>;
export const categoryController = new CategoryController(categoryService);
