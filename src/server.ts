import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import userRoutes from './routes/api/userRoutes';
import dotenv from 'dotenv';
import UserModel, { IUserProps } from '../src/models/UserModel';

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
// const getUsersData = async (): Promise<void> => {
//   const users = await UserModel.getUsers();
//   return console.log('USERS:', users);
// };
// getUsersData();

//endpoints/routes configurations
app.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to DemoCredit server!');
});
app.use(userRoutes);

//Error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Server Error:', err.stack);
  res.status(500).send('Something went wrong probably due to internal server error, please try again!');
});

// class AppError extends Error {
//   statusCode: number;

//   constructor(message: string, statusCode: number = 500) {
//     super(message);
//     this.statusCode = statusCode;
//     this.name = this.constructor.name;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   if (err instanceof AppError) {
//     console.error(`AppError: ${err.message}`);
//     res.status(err.statusCode).send(err.message);
//   } else {
//     console.error(`InternalServerError: ${err.stack}`);
//     res.status(500).send('Something went wrong probably due to an internal server error, please try again!');
//   }
// });

app.listen(PORT, () => console.log(`DemoCredit server is running on port: http://localhost:${PORT}`));
