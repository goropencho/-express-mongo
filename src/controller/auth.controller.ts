import type {Request, Response} from 'express';
import catchAsync from '../utils/CatchAsync';

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(201).send({...user, tokens});
});
