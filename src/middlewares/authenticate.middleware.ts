import {Request, Response, NextFunction} from 'express';
import {UnauthorizedException} from '../utils/exceptions';
import {tokenService} from '../services';
import TOKEN_TYPES from '../config/tokens';
import {env} from '../config/config';
import jwt = require('jsonwebtoken');
import {TokenPayload} from '../constants/jwtPayload';

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const decodedToken = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    req.user = decodedToken.user?.id;
    next();
  } catch (error) {
    next(error);
  }
};

function extractTokenFromHeader(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

export {auth};
