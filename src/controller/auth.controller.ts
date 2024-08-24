import {NextFunction, Request, Response} from 'express';
import {authService, tokenService, userService} from '../services';
import catchAsync from '../utils/catchAsync';

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(201).send({user, tokens});
  }
);

export const signIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;
    const user = await authService.login(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({...user, tokens});
  }
);
