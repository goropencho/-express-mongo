import {otpService, tokenService, userService} from '.';
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

export const resetPassword = async (token: string, newPassword: string) => {
  const resetPasswordTokenDoc = await tokenService.verifyToken(
    token,
    TOKEN_TYPES.RESET_PASSWORD
  );
  const user = await userService.getUserById(resetPasswordTokenDoc.id);
  if (!user) {
    throw new NotFoundException('User not found');
  }
  await userService.updateUserById(user.id, {password: newPassword});
  await Token.deleteMany({user: user.id, type: TOKEN_TYPES.RESET_PASSWORD});
};

export async function sendOTP(email: string) {
  const user = await userService.getUserByEmail(email);
  if (user) {
    throw new BadRequestException('User already exists');
  }
  await otpService.generateOTP(email);
}
