import catchAsync from '../utils/catchAsync';
import {Response} from 'express';
import {AuthRequest} from '../utils/customRequest';
import {productService} from '../services';

export const CreateProduct = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const {user} = req;
    const product = await productService.createProduct(user, req.body);
    res.status(201).send(product);
  }
);
export const GetAllProduct = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const {user} = req;
    const product = await productService.getProducts(user);
    res.status(201).send({response: product});
  }
);
export const GetProduct = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const {user} = req;
    const {id} = req.params;
    const product = await productService.getProduct(user, id as string);
    res.status(201).send({response: product});
  }
);
export const UpdateProduct = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const {user} = req;
    const {id: productId} = req.params;
    const product = await productService.updateProduct(
      user,
      productId,
      req.body
    );
    res.status(201).send({response: product});
  }
);
export const DeleteProduct = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const {user} = req;
    const {id: productId} = req.params;
    const product = await productService.deleteProduct(user, productId);
    res.status(200).send({response: product});
  }
);
