const router = require('express').Router();
import swaggerUi = require('swagger-ui-express');
import swaggerDocument = require('./swagger.json');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

export default router;
