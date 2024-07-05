import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import socketio from 'socket.io';
import morgan from 'morgan';
import cors from 'cors';

import usersTransactionApiRoutes from './routes/api/userRoutes';

const app = express();
// CORS options definition
// const corsOptions = {
//   origin: 'https://exampleofonlytheoriginstoalow.com',
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true, 
//   optionsSuccessStatus: 200
// };
// Use CORS middleware
app.use(cors());

// Bodyparser that handles incoming and outgoing API JSON data
app.use(express.json());

// Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('development'));
  console.log('===> DEVELOPMENT ENVIRONMENT CURRENTLY IN USE!');
} else {
  app.use(morgan('production'));
  console.log('===> PRODUCTION ENVIRONMENT CURRENTLY IN USE!');
}

// Endpoints/routes definition
app.get('/', (_req: Request, res: Response) => {
  console.log('GET Request Initiated On:', _req.route.path);
  res.send('Welcome to Chiedozie\'s Lendsqr Backend Engineer Assessment V2 DemoCredit wallet server app!');
});

app.use(usersTransactionApiRoutes);

// Handle errors gracefully
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Server Error:', err.stack);
  res.status(500).send('Something went wrong, probably due to an internal server error. Please try again!');
});

export default app;
