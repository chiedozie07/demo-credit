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
// Bodyparser that handles incoming and outgoing API JSON data
app.use(express_1.default.json());
// Dev logging
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
else {
    app.use((0, morgan_1.default)('production'));
}
;
// Endpoints/routes definition
app.get('/', (_req, res) => {
    res.send('Welcome to Chiedozie\'s Lendsqr Backend Engineer Assessment V2 DemoCredit wallet server app!');
});
app.use(userRoutes_1.default);
// Handle errors gracefully
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).send('Something went wrong, probably due to an internal server error. Please try again!');
});
// Export the server for testing
const server = app.listen(PORT, () => {
    console.log(`DemoCredit server is running on port: http://localhost:${PORT}`);
});
exports.default = server;
