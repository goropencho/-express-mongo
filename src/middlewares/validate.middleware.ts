import type {Request, Response, NextFunction} from 'express';
import {z} from 'zod';

import {BadRequestException, InternalServerError} from '../utils/exceptions';

export const validateBody =
  (schema: z.Schema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        var errors = err.issues[0];
        var error = `${errors.path[0]}: ${errors.message}`;
        throw new BadRequestException(error);
      } else {
        throw new InternalServerError();
      }
    }
  };
