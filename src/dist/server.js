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
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
//bodyparser that handles incomming and outgoing API json data
app.use(express_1.default.json());
//dev login
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
else {
    app.use((0, morgan_1.default)('production'));
}
;
//endpoints/routes configurations
app.get('/', (_req, res) => {
    res.send('Welcome to Chiedozie\'s DemoCredit server app for Lendsqr Backend Engineer Assessment V2!');
});
app.use(userRoutes_1.default);
//handle errors gracefully
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).send('Something went wrong probably due to internal server error, please try again!');
});
app.listen(PORT, () => console.log(`DemoCredit server is running on port: http://localhost:${PORT}`));
