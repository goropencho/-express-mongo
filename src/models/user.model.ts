import mongoose, {Document, Model} from 'mongoose';
import bcrypt = require('bcrypt');
import {SignUpInterface} from '../schema/auth.schema';

interface IUser {
  email: string;
  password: string;
}

interface IUserModel extends Model<IUser> {
  isEmailTaken(email: string, excludeUserId?: string): Promise<boolean>;
}

interface IUserDocument extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUserDocument, IUserModel>(
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
    toJSON: {
      transform: (doc, ret) => {
        (ret.id = ret._id), delete ret._id;
      },
    },
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
  return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = new mongoose.Model('User', userSchema);

export {User};
