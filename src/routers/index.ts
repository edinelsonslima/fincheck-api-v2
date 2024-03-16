import { Router } from 'express';

import { validate } from 'middleware/validators';
import { router as auth } from './auth';
import { router as user } from './user';
import { router as bankAccount } from './bank-account';
import { router as category } from './category';

const router = Router();

router.get('/ping', (_, res) => res.send('🏓 pong!'));

router.use('/auth', auth);
router.use('/users', validate.authorization(), user);
router.use('/bank-accounts', validate.authorization(), bankAccount);
router.use('/categories', validate.authorization(), category);

export { router };
