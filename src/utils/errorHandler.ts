import {NextFunction, Request, Response} from 'express';
import {BadRequestException, InternalServerError} from './exceptions';
import {HttpException} from './exceptions/http.exception';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpException) {
    res.status(err.statusCode).json({message: err.message});
  } else {
    res.status(500).json({message: 'Unexpected Error'});
  }
};
