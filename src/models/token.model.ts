import mongoose, {Document, Model} from 'mongoose';
import TOKEN_TYPES from '../config/tokens';

interface ITokenDocument extends Document {
  token: string;
  user: string;
  type: string;
  expires: Date;
  blacklisted: boolean;
}
type ITokenModel = Model<ITokenDocument>;
type IToken = ITokenDocument;

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
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Token: ITokenModel = mongoose.model<IToken, ITokenModel>(
  'Token',
  tokenSchema
);

export {Token};
