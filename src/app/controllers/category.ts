import { ICategoryService, categoryService } from '@services/category';
import { Request, Response } from 'express';

class CategoryController {
  constructor(private readonly categoryService: ICategoryService) {
    this.findAllByUserId = this.findAllByUserId.bind(this);
  }

  public async findAllByUserId(req: Request, res: Response) {
    try {
      const userId = req.userId;

      const categories = await this.categoryService.findAllByUserId(userId);

      res.status(200).json(categories);
    } catch (error: any) {
      const err: Error = error;
      res.status(500).json({ error: err.message });
    }
  }
}

export type ICategoryController = InstanceType<typeof CategoryController>;
export const categoryController = new CategoryController(categoryService);
