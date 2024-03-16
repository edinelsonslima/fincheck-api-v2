import { categoryController } from '@controllers/category';
import { Router } from 'express';

const router = Router();

router.get('/', categoryController.findAllByUserId);

export { router };
