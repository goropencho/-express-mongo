import mongoose from 'mongoose';
import {env} from './config';

const connectDb = async () => {
  mongoose
    .connect(env.MONGODB_URL)
    .then(() => {
      console.log('Connected to Database');
    })
    .catch(err => {
      console.error('DB Connection Error', err.message);
      throw 'Could not Connect to Database';
    });
};

export default connectDb;
