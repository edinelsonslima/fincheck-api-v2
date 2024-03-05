import { Router } from 'express';

import { router as auth } from './auth';

const router = Router();

router.get('/ping', (_, res) => res.send('🏓 pong!'));

router.use('/auth', auth);

export { router };
