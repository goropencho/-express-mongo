import express = require('express');
import cors = require('cors');
import {env} from './config/config';
import {errorHandler} from './utils/errorHandler';
import mongoose from 'mongoose';
const app = express();

mongoose.connect(env.MONGODB_URL).then(() => {
  console.log('Connected to Database');
});

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  return res.send({...req.body, id: 1, ...env});
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('App is listening on', env.PORT);
});
