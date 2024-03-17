import { categoryController } from '@controllers/category';
import { Router } from 'express';

const router = Router();

router.get('/', categoryController.index);

export { router };
