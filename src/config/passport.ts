import {User} from '../models/user.model';
import TOKEN_TYPES from './tokens';

import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {env} from './config';

const jwtOptions = {
  secretOrKey: env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: any, done: any) => {
  try {
    if (payload.type !== TOKEN_TYPES.ACCESS) {
      throw new Error('Invalid Token Type');
    }
    const user = await User.findById(payload.user);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export {jwtStrategy};
