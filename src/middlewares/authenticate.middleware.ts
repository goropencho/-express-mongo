import {Request, Response, NextFunction} from 'express';
import {UnauthorizedException} from '../utils/exceptions';
import {tokenService} from '../services';
import {AuthRequest} from '../utils/customRequest';

const auth =
  () =>
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const token = extractTokenFromHeader(req);
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      const decodedToken = await tokenService.verifyToken(token);
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
