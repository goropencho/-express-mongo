import {z} from 'zod';

export const CreateProductSchema = z.object({
  title: z.string(),
});

export type CreateProductInterface = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = CreateProductSchema.extend({});

export type UpdateProductInterface = z.infer<typeof UpdateProductSchema>;
