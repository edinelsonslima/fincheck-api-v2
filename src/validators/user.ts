import { z } from 'zod';

export const meParamSchema = z.object({
  userId: z.string().min(1).uuid(),
});
