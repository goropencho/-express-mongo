import {NextFunction, Request, Response} from 'express';
import {tokenService, userService} from '../services';
import catchAsync from '../utils/catchAsync';

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(201).send({...user, tokens});
  }
);
