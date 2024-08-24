import {Router} from 'express';
import {authController} from '../controller';
import {LogOutSchema, SignInSchema, SignUpSchema} from '../schema/auth.schema';
import {validateBody} from '../middlewares/validate.middleware';

const routes = Router();

routes.post('/sign-up', validateBody(SignUpSchema), authController.signUp);
routes.post('/sign-in', validateBody(SignInSchema), authController.signIn);
routes.post('/sign-out', validateBody(LogOutSchema), authController.signOut);

export default routes;
