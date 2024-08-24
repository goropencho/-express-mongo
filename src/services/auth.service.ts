import {tokenService, userService} from '.';
import TOKEN_TYPES from '../config/tokens';
import {Token} from '../models/token.model';
import {BadRequestException, NotFoundException} from '../utils/exceptions';

export const login = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new BadRequestException('Email/Password invalid');
  }
  return user;
};

export const logout = async (refreshToken: string) => {
  const removeToken = await Token.findOne({
    token: refreshToken,
    type: TOKEN_TYPES.REFRESH,
  });
  if (!removeToken) {
    throw new NotFoundException();
  }
  const response = await removeToken.deleteOne();
  return response;
};
