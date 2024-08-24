import mongoose, {Document, Model, model} from 'mongoose';
import bcrypt = require('bcrypt');
import {SignUpInterface} from '../schema/auth.schema';

interface IUserDocument extends Document {
  email: string;
  password: string;
}

interface IUserModel extends Model<IUserDocument> {
  isEmailTaken(email: string, excludeUserId?: string): Promise<boolean>;
}

interface IUser extends IUserDocument {
  isPasswordMatch(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      private: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({email, _id: {$ne: excludeUserId}});
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (
  this: IUserDocument,
  password: string
) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User: IUserModel = model<IUser, IUserModel>('User', userSchema);

export {User};
