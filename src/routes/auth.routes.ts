import {Router} from 'express';
import {authController} from '../controller';
import {SignUpSchema} from '../schema/auth.schema';
import {validate} from '../middlewares/validate.middleware';

const routes = Router();

routes.post('/sign-in', validate(SignUpSchema), authController.signUp);

export default routes;
