import { bankAccountController } from '@controllers/bank-account';
import { Router } from 'express';

const router = Router();

router.get('/', bankAccountController.findAllByUserId);

router.post('/');

router.get('/:bankAccountId');

router.put('/:bankAccountId');

router.delete('/:bankAccountId');

export { router };
