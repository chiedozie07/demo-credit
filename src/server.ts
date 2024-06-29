import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import userTransactionApiRoutes from './routes/api/userRoutes';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

//bodyparser that handles incomming and outgoing API json data
app.use(express.json());

//dev login
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('production'));
};

//endpoints/routes definition
app.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to Chiedozie\'s DemoCredit server app for Lendsqr Backend Engineer Assessment V2!');
});
app.use(userTransactionApiRoutes);

//handle errors gracefully
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Server Error:', err.stack);
  res.status(500).send('Something went wrong probably due to internal server error, please try again!');
});

app.listen(PORT, () => console.log(`DemoCredit server is running on port: http://localhost:${PORT}`));
