import mongoose, {Document, Model} from 'mongoose';

interface IProductDocument extends Document {
  title: string;
  user: string;
}

type IProductModel = Model<IProductDocument>;
type IProduct = IProductDocument;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
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

const Product: IProductModel = mongoose.model<IProduct, IProductModel>(
  'Product',
  productSchema
);

export {Product};
