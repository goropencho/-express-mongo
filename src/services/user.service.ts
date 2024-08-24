import {User} from '../models/user.model';
import {SignUpInterface} from '../schema/auth.schema';
import {BadRequestException} from '../utils/exceptions/bad_request.exception';

export const createUser = async (userBody: SignUpInterface): Promise<any> => {
  const {email, password} = userBody;
  const isEmailTaken = await User.isEmailTaken(email);
  if (isEmailTaken) {
    throw new BadRequestException('User Already Exists');
  }
  return (await User.create({email, password})).toJSON();
};

export async function getUserByEmail(email: string): Promise<any> {
  const user = await User.findOne({email});
  return user;
}
