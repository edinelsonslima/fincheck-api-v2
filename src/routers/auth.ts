import { authController } from '@controllers/auth';
import { signinBodySchema } from '@validators/auth';
import { Router } from 'express';
import { validate } from 'middleware/validator-body';

const router = Router();

router.get('/signin', authController.signin);

router.post('/signup', authController.signup);

export { router };
