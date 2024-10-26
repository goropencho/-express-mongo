import {Router} from 'express';
import {authController} from '../controller';
import {
  ForgotPasswordSchema,
  LogOutSchema,
  RefreshTokenSchema,
  ResetPasswordSchema,
  SendOTPEmailSchema,
  SignInSchema,
  SignUpSchema,
} from '../schema/auth.schema';
import {validateBody} from '../middlewares/validate.middleware';

const routes = Router();

routes.post('/sign-up', validateBody(SignUpSchema), authController.signUp);
routes.post('/sign-in', validateBody(SignInSchema), authController.signIn);
routes.post('/sign-out', validateBody(LogOutSchema), authController.signOut);
routes.post(
  "/forgot-password'",
  validateBody(ForgotPasswordSchema),
  authController.forgotPassword
);
routes.post(
  '/refresh-token',
  validateBody(RefreshTokenSchema),
  authController.refreshTokens
);
routes.post(
  "/reset-password'",
  validateBody(ResetPasswordSchema),
  authController.resetPassword
);
routes.post(
  '/send-otp',
  validateBody(SendOTPEmailSchema),
  authController.sendOTP
);

export default routes;
