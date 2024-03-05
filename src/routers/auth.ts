import { Router } from 'express';

const router = Router();

router.post('/signin', (_, res) => res.send('signin'));
router.post('/signup', (_, res) => res.send('signup'));

export { router };
