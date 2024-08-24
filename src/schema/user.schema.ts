import {z} from 'zod';

export const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().email().optional(),
});

export type UpdateUserInterface = z.infer<typeof UpdateUserSchema>;
