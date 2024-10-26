import {env} from '../config/config';
import {createTransport} from 'nodemailer';
import {InternalServerError} from '../utils/exceptions';

const transport = createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USERNAME,
    pass: env.SMTP_PASSWORD,
  },
});

try {
  transport.verify();
  console.log('Connected Successfully to the SMTP Server');
} catch (error) {
  if (error instanceof Error) {
    console.error('Error occurred in SMTP Server connection:', error.message);
  }
  throw new InternalServerError('SMTP server connection failed');
}

export const sendResetPasswordEmail = async (
  email: string,
  resetToken: string
) => {
  const subject = 'Reset Password - ExpressMango';
  const resetPasswordUrl = `${env.FE_URL}/reset-password?token=${resetToken}`;
  const content = `Dear User, 
  
  Reset Password with the given link: ${resetPasswordUrl}
  Ignore if not request by you.

  Regards,
  Admin  
  `;
  await sendMail(email, subject, content);
};

export const sendVerificationEmail = async (
  email: string,
  verifyOTP: number
) => {
  const subject = 'Email Verification - ExpressMango';
  const content = `Dear User, 
  
  Verify your account with the given otp: ${verifyOTP}
  Ignore if not requested by you.

  Regards,
  Admin  
  `;
  await sendMail(email, subject, content);
};

export const sendMail = async (
  to: string,
  subject: string,
  content: string
) => {
  const msg = {from: env.EMAIL_FROM, to, subject, text: content};
  await transport.sendMail(msg);
};
