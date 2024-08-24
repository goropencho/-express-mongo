import {z} from 'zod';

export const SignUpSchema = z.object({
  email: z.string().email({message: 'Invalid Email'}),
  password: z.string().min(8, {message: 'Required Minimum Length 8'}),
  otp: z.coerce.number(),
});

export type SignUpInterface = z.infer<typeof SignUpSchema>;

export const SignInSchema = SignUpSchema.extend({});

export type SignInInterface = z.infer<typeof SignInSchema>;

export const LogOutSchema = z.object({
  refreshToken: z.string(),
});

export type LogOutInterface = z.infer<typeof LogOutSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().email({message: 'Invalid Email'}),
});

export type ForgotPasswordInterface = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, {message: 'Required Minimum Length of 8'}),
});

export type ResetPasswordInterface = z.infer<typeof ResetPasswordSchema>;

export const SendOTPEmailSchema = z.object({
  email: z.string().email(),
});

export type SendOTPEmailInterface = z.infer<typeof SendOTPEmailSchema>;
