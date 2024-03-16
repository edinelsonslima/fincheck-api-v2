import { bankAccountController } from '@controllers/bank-account';
import { createBankAccountBodySchema } from '@validators/bank-account';
import { Router } from 'express';
import { validate } from 'middleware/validators';

const router = Router();

router.get('/', bankAccountController.findAllByUserId);

router.post(
  '/',
  validate.body(createBankAccountBodySchema),
  bankAccountController.create
);

router.get('/:bankAccountId');

router.put('/:bankAccountId');

router.delete('/:bankAccountId');

export { router };
