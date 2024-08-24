import {NextFunction, Request, Response} from 'express';
import {BadRequestException, InternalServerError} from './exceptions';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BadRequestException) {
    res.status(400).json({message: err.message});
  } else if (err instanceof InternalServerError) {
    res.status(500).json({message: 'Internal Server Error'});
  } else {
    res.status(500).json({message: 'Unexpected Error'});
  }
};
