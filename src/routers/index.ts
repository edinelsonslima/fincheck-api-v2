import { Router } from 'express';

import { authorization } from '@middlewares/authorization';
import { router as auth } from './auth';
import { router as bankAccount } from './bank-account';
import { router as category } from './category';
import { router as transaction } from './transaction';
import { router as user } from './user';

const router = Router();

router.get('/ping', (_, res) => res.send('🏓 pong!'));

router.use('/auth', auth);
router.use('/users', authorization(), user);
router.use('/bank-accounts', authorization(), bankAccount);
router.use('/categories', authorization(), category);
router.use('/transactions', authorization(), transaction);

export { router };
