import 'dotenv/config';
import {z} from 'zod';

const ENUM_NODE_ENVS = z.enum(['production', 'development', 'staging']);

const envVarsSchema = z.object({
  NODE_ENV: ENUM_NODE_ENVS,
  PORT: z.coerce.number().default(3000),
  MONGODB_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_ACCESS_EXPIRATION_MINUTES: z.coerce.number().default(30),
  JWT_REFRESH_EXPIRATION_DAYS: z.coerce.number().default(30),
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: z.coerce.number().default(10),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: z.coerce.number().default(10),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
  EMAIL_FROM: z.string().email(),
});

export const env = envVarsSchema.parse(process.env);
