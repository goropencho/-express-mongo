import {Router} from 'express';

const routes = Router();

routes.post('/sign-in', authController.signIn);

export default routes;
