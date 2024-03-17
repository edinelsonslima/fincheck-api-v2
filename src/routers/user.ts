import { userController } from '@controllers/user';
import { Router } from 'express';

const router = Router();

router.get('/me', userController.show);

export { router };
