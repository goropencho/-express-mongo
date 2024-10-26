import {Request, Response} from 'express';
import {
  authService,
  emailService,
  tokenService,
  userService,
} from '../services';
import catchAsync from '../utils/catchAsync';

export const signUp = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(201).send({user, tokens});
  }
);

export const signIn = catchAsync(async (req: Request, res: Response) => {
  const {email, password} = req.body;
  const user = await authService.login(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({user, tokens});
});

export const signOut = catchAsync(async (req: Request, res: Response) => {
  const {refreshToken} = req.body;
  await authService.logout(refreshToken);
  res.status(205).send();
});

export const forgotPassword = catchAsync(
  async (req: Request, res: Response) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(
      req.body.email
    );
    await emailService.sendResetPasswordEmail(
      req.body.email,
      resetPasswordToken
    );
    res.status(204).send();
  }
);

export const refreshTokens = catchAsync(async (req: Request, res: Response) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({...tokens});
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const {token, password} = req.body;
  await authService.resetPassword(token, password);
  res.status(200).send({message: 'Password has been reset successfully.'});
});

export const sendOTP = catchAsync(async (req: Request, res: Response) => {
  const {email} = req.body;
  await authService.sendOTP(email);
  res.status(201).send({message: 'OTP sent for verification'});
});
