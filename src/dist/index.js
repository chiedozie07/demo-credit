"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 5500;
// Start and export the server for testing
// const server = 
app_1.default.listen(PORT, () => console.log(`DemoCredit server is running on port: http://localhost:${PORT}`));
// export default server;
