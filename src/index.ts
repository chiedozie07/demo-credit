import app from './app';
import dotenv from 'dotenv';
// import http from 'http';
import morgan from 'morgan';


dotenv.config();

const PORT = process.env.PORT || 3000;
// Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('development'));
  console.log('===> DEVELOPMENT ENVIRONMENT CURRENTLY IN USE...');
} else {
  app.use(morgan('production'));
  console.log('===> PRODUCTION ENVIRONMENT CURRENTLY IN USE...');
};
// Start the server
const server = app.listen(PORT, () => console.log(`DemoCredit server is running on port: http://localhost:${PORT}`));