import {userService} from '.';
import {BadRequestException} from '../utils/exceptions';

export const login = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new BadRequestException('Email/Password invalid');
  }
  return user;
};
