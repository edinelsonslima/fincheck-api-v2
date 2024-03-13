import { Router } from 'express';

import { validate } from 'middleware/validators';
import { router as auth } from './auth';
import { router as users } from './user';

const router = Router();

router.get('/ping', (_, res) => res.send('🏓 pong!'));

router.use('/auth', auth);
router.use('/users', validate.authorization(), users);

export { router };
