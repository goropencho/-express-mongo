import mongoose, {Document, Model, mongo} from 'mongoose';
import TOKEN_TYPES from '../config/tokens';

interface IToken extends Document {
  token: string;
  user: string;
  type: string;
  expires: Date;
  blacklisted: boolean;
}

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [
        TOKEN_TYPES.REFRESH,
        TOKEN_TYPES.RESET_PASSWORD,
        TOKEN_TYPES.VERIFY_EMAIL,
      ],
      expires: {
        type: Date,
        required: true,
      },
      blacklisted: {
        type: Boolean,
        default: false,
      },
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

const Token = mongoose.model('Token', tokenSchema);

export {Token};
