import {Router} from 'express';
import {authController} from '../controller';
import {SignInSchema, SignUpSchema} from '../schema/auth.schema';
import {validate} from '../middlewares/validate.middleware';

const routes = Router();

routes.post('/sign-up', validate(SignUpSchema), authController.signUp);
routes.post('/sign-in', validate(SignInSchema), authController.signIn);

export default routes;
