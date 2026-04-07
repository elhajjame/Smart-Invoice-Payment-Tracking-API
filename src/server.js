import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: 'config.env' });

mongoose.connect(process.env.DB_CONNECT).then((con) => {
  console.log('database connected successfully');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`the server running on the port ${port}`);
});