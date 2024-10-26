import {env} from '../config/config';
import {generate} from 'otp-generator';
import {OTP} from '../models/otp.model';

export const generateOTP = async (email: string, length = env.OTP_LENGTH) => {
  let otp = generate(length, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  let result = await OTP.findOne({otp: otp});
  while (result) {
    otp = generate(length, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    result = await OTP.findOne({otp: otp});
  }
  const otpPayload = {otp, email};
  await OTP.create(otpPayload);
  return otpPayload;
};
