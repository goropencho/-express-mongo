import express = require('express');
import cors = require('cors');
import {env} from './config/config';
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.send({...req.body, id: 1, ...env});
});

app.listen(3000, () => {
  console.log('App is listening on', env.PORT);
});
