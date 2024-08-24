import {Router} from 'express';
import authRouter from './auth.routes';
import {env} from 'process';
const router = Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  // {
  //   path: "/user",
  //   route: userRouter,
  // },
  // {
  //   path: "/product",
  //   route: productRouter,
  // },
];

// Swagger
const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

if (env.NODE_ENV !== 'production') {
  devRoutes.forEach(route => {
    router.use(route.path, route.route);
  });
}
