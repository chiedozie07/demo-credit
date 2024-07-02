import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import socketio from 'socket.io';

import morgan from 'morgan';
import usersTransactionApiRoutes from './routes/api/userRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Bodyparser that handles incoming and outgoing API JSON data
app.use(express.json());

// Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('production'));
};

// Endpoints/routes definition
app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to Chiedozie\'s Lendsqr Backend Engineer Assessment V2 DemoCredit wallet server app!');
});
app.use(usersTransactionApiRoutes);

// Handle errors gracefully
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Server Error:', err.stack);
  res.status(500).send('Something went wrong, probably due to an internal server error. Please try again!');
});

export default app;
