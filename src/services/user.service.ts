import {OTP} from '../models/otp.model';
import {User} from '../models/user.model';
import {SignUpInterface} from '../schema/auth.schema';
import {UpdateUserInterface} from '../schema/user.schema';
import {NotFoundException} from '../utils/exceptions';
import {BadRequestException} from '../utils/exceptions/bad_request.exception';

export const createUser = async (userBody: SignUpInterface): Promise<any> => {
  const {email, password, otp} = userBody;
  const isEmailTaken = await User.isEmailTaken(email);
  if (isEmailTaken) {
    throw new BadRequestException('User Already Exists');
  }
  const lastOtp = await OTP.find({email: email}).sort({expires: -1}).limit(1);
  if (lastOtp.length === 0 || otp !== lastOtp[0].otp) {
    throw new BadRequestException('Invalid OTP');
  }
  return (await User.create({email, password})).toJSON();
};

export async function getUserByEmail(email: string): Promise<any> {
  const user = await User.findOne({email});
  return user;
}

export async function getUserById(id: string): Promise<any> {
  const user = await User.findById(id);
  return user;
}

export const updateUserById = async (
  userId: string,
  updateBody: UpdateUserInterface
) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new NotFoundException('User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new BadRequestException('Email Already Exits');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};
