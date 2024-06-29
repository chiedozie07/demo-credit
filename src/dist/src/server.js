"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const userRoutes_1 = __importDefault(require("./routes/api/userRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//bodyparser that handles incomming and outgoing API json data 
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
//dev login
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
else {
    app.use((0, morgan_1.default)('production'));
}
;
//endpoints/routes configurations
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('Welcome to DemoCredit server!');
});
app.use('/api', userRoutes_1.default);
//Error handling
app.use((err, req, res, next) => {
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
