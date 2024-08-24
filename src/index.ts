import express = require('express');
import cors = require('cors');
import {env} from './config/config';
import {errorHandler} from './utils/errorHandler';
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.send({...req.body, id: 1, ...env});
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('App is listening on', env.PORT);
});
