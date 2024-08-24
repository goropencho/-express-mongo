import {Product} from '../models/product.model';
import {
  CreateProductInterface,
  UpdateProductInterface,
} from '../schema/product.schema';
import {NotFoundException} from '../utils/exceptions';

export const createProduct = async (
  userId: string,
  productBody: CreateProductInterface
): Promise<any> => {
  const {title} = productBody;
  const product = await Product.create({
    title,
    user: userId,
  });
  return product;
};

export const deleteProduct = async (
  userId: string,
  productId: string
): Promise<any> => {
  const product = await Product.findOne({
    id: productId,
    user: userId,
  });
  if (!product) {
    throw new NotFoundException();
  }
  product.deleteOne();
  return product;
};

export const updateProduct = async (
  userId: string,
  productId: string,
  updateProduct: UpdateProductInterface
): Promise<any> => {
  const product = await Product.findOne({
    id: productId,
    user: userId,
  });
  if (!product) {
    throw new NotFoundException();
  }
  Object.assign(product, updateProduct);
  await product.save();
  return product;
};

export const getProduct = async (
  userId: string,
  productId: string
): Promise<any> => {
  const product = await Product.findOne({
    id: productId,
    user: userId,
  });
  if (!product) {
    throw new NotFoundException();
  }
  return product;
};

export const getProducts = async (userId: string): Promise<any> => {
  const product = await Product.find({
    user: userId,
  });
  return product;
};
