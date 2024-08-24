import {NextFunction} from 'express';

const catchAsync =
  (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      Promise.resolve(fn(req, res, next));
    } catch (error) {
      console.error(error);
    }
  };

export default catchAsync;
