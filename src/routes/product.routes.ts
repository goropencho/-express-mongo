import {Router} from 'express';
import {validateBody} from '../middlewares/validate.middleware';
import {
  CreateProductSchema,
  UpdateProductSchema,
} from '../schema/product.schema';
import {productController} from '../controller';
import {auth} from '../middlewares/authenticate.middleware';

const routes = Router();

routes
  .route('/')
  .post(
    auth,
    validateBody(CreateProductSchema),
    productController.CreateProduct
  )
  .get(auth, productController.GetAllProduct);

routes
  .route('/:id')
  .get(auth, productController.GetProduct)
  .put(auth, validateBody(UpdateProductSchema), productController.UpdateProduct)
  .delete(auth, productController.DeleteProduct);

export default routes;
