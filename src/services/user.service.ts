import {User} from '../models/user.model';
import {SignUpInterface} from '../schema/auth.schema';
import {BadRequestException} from '../utils/exceptions/bad_request.exception';

export const createUser = async (userBody: SignUpInterface) => {
  const {email, password} = userBody;
  const isEmailTaken = await User.isEmailTaken(email);
  if (isEmailTaken) {
    throw new BadRequestException('Email/Password Invalid');
  }
  return User.create({email, password});
};
