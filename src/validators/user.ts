import { z } from 'zod';

const meParamSchema = z.object({
  userId: z.string().min(1).uuid(),
});

export { meParamSchema };
