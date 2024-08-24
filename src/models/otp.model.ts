import mongoose, {Document, Model} from 'mongoose';
import {env} from '../config/config';
import {emailService} from '../services';

interface IOTPDocument extends Document {
  email: string;
  otp: number;
  expires: Date;
}

interface IOTPModel extends Model<IOTPDocument> {}
interface IOTP extends IOTPDocument {}

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  expires: {
    type: Date,
    default: Date.now,
    expires: 60 * env.OTP_EXPIRATION_MINUTES,
  },
});

otpSchema.pre('save', async function (next) {
  if (this.isNew) {
    await emailService.sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const OTP: IOTPModel = mongoose.model<IOTP, IOTPModel>('OTP', otpSchema);

export {OTP};
