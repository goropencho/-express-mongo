import {Request, Response, NextFunction} from 'express';
import {AuthRequest} from './customRequest';

const catchAsync = (
  fn: (req: any, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default catchAsync;
