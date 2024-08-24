import jwt = require('jsonwebtoken');
import moment = require('moment');
import {env} from '../config/config';
import TOKEN_TYPES from '../config/tokens';
import {Token} from '../models/token.model';
import {unknown} from 'zod';
import {UnauthorizedException} from '../utils/exceptions';

interface TokenPayload extends jwt.JwtPayload {
  user: {
    id: string;
  };
}

export const generateAuthTokens = async (user: any) => {
  const accessTokenExpires = moment().add(
    env.JWT_ACCESS_EXPIRATION_MINUTES,
    'minutes'
  );
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    TOKEN_TYPES.ACCESS
  );

  const refreshAccessTokenExpires = moment().add(
    env.JWT_REFRESH_EXPIRATION_DAYS,
    'days'
  );
  const refreshToken = generateToken(
    user.id,
    refreshAccessTokenExpires,
    TOKEN_TYPES.REFRESH
  );
  await saveToken(
    refreshToken,
    user.id,
    refreshAccessTokenExpires,
    TOKEN_TYPES.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshAccessTokenExpires.toDate(),
    },
  };
};

async function saveToken(
  token: string,
  userId: string,
  expires: moment.Moment,
  type: string,
  blacklisted = false
) {
  const savedToken = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return savedToken;
}
function generateToken(
  userId: string,
  refreshAccessTokenExpires: moment.Moment,
  type: string,
  secret: string = env.JWT_SECRET
): string {
  const payload: TokenPayload = {
    user: {
      id: userId,
    },
    iat: moment().unix(),
    exp: refreshAccessTokenExpires.unix(),
    type,
  };

  return jwt.sign(payload, secret);
}

export const verifyToken = (token: string): Promise<TokenPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          reject(new UnauthorizedException('Token expired'));
        } else {
          reject(new UnauthorizedException('Invalid token'));
        }
      } else {
        resolve(decoded as TokenPayload);
      }
    });
  });
};
