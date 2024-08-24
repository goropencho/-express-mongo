import {z} from 'zod';

export const SignUpSchema = z.object({
  email: z.string().email({message: 'Invalid Email'}),
  password: z.string().min(8, {message: 'Required Minimum Length 8'}),
});

export type SignUpInterface = z.infer<typeof SignUpSchema>;

export const SignInSchema = SignUpSchema.extend({});

export type SignInInterface = z.infer<typeof SignInSchema>;

export const LogOutSchema = z.object({
  refreshToken: z.string(),
});

export type LogOutInterface = z.infer<typeof LogOutSchema>;
