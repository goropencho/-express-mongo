import {Router} from 'express';
import authRouter from './auth.routes';
import productRoutes from './product.routes';
import {env} from 'process';
const router = Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/product',
    route: productRoutes,
  },
];

// Swagger
// const devRoutes = [
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

// if (env.NODE_ENV !== 'production') {
//   devRoutes.forEach(route => {
//     router.use(route.path, route.route);
//   });
// }

export default router;
