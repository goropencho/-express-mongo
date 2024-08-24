import jwt = require('jsonwebtoken');
import moment = require('moment');
import {env} from '../config/config';
import TOKEN_TYPES from '../config/tokens';
import {Token} from '../models/token.model';
import {unknown} from 'zod';
import {NotFoundException, UnauthorizedException} from '../utils/exceptions';
import {userService} from '.';

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

export const verifyToken = async (
  token: string,
  type: string
): Promise<TokenPayload> => {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    if (type === TOKEN_TYPES.ACCESS) {
      return payload;
    }
    const tokenDoc = await Token.findOne({
      token,
      type,
      user: payload.sub,
      blacklisted: false,
    });

    if (!tokenDoc) {
      throw new UnauthorizedException('Token not found');
    }

    return payload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedException('Token expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedException('Invalid token');
    } else {
      throw error; // Re-throw other errors
    }
  }
};

export const generateResetPasswordToken = async (email: string) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new NotFoundException('No user associated with the email');
  }
  const expires = moment().add(
    env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    'minutes'
  );
  const resetPasswordToken = generateToken(
    user.id,
    expires,
    TOKEN_TYPES.RESET_PASSWORD
  );
  await saveToken(
    resetPasswordToken,
    user.id,
    expires,
    TOKEN_TYPES.RESET_PASSWORD
  );
  return resetPasswordToken;
};
