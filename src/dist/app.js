"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/api/userRoutes"));
const app = (0, express_1.default)();
// CORS options definition
// const corsOptions = {
//   origin: 'https://exampleofonlytheoriginstoalow.com',
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true, 
//   optionsSuccessStatus: 200
// };
// Use CORS middleware
app.use((0, cors_1.default)());
// Bodyparser that handles incoming and outgoing API JSON data
app.use(express_1.default.json());
// Dev logging
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('development'));
    console.log('===> DEVELOPMENT ENVIRONMENT CURRENTLY IN USE!');
}
else {
    app.use((0, morgan_1.default)('production'));
    console.log('===> PRODUCTION ENVIRONMENT CURRENTLY IN USE!');
}
// Endpoints/routes definition
app.get('/', (_req, res) => {
    console.log('GET Request Initiated On:', _req.route[0]);
    res.send('Welcome to Chiedozie\'s Lendsqr Backend Engineer Assessment V2 DemoCredit wallet server app!');
});
app.use(userRoutes_1.default);
// Handle errors gracefully
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).send('Something went wrong, probably due to an internal server error. Please try again!');
});
exports.default = app;
