import {NextFunction, Request, Response} from 'express';
import {BadRequestException, InternalServerError} from './exceptions';
import {HttpException} from './exceptions/http.exception';
import logError from './logError';
import {env} from '../config/config';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpException) {
    res.status(err.statusCode).json({
      message: err.message,
      ...(env.NODE_ENV !== 'production' && {stack: err.stack}),
    });
  } else {
    logError(err);
    res.status(500).json({
      message: 'Unexpected Error',
      ...(env.NODE_ENV !== 'production' && {stack: err.stack}),
    });
  }
};
