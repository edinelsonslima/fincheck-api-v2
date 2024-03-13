import { userController } from '@controllers/user';
import { meParamSchema } from '@validators/user';
import { Router } from 'express';
import { validate } from 'middleware/validators';

const router = Router();

router.get('/me/:userId', validate.param(meParamSchema), userController.me);

export { router };
