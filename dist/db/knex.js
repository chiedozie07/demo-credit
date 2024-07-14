"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./knexfile"));
dotenv_1.default.config();
const environment = (process.env.NODE_ENV || 'development');
const config = knexfile_1.default[environment];
const knex = (0, knex_1.default)(config);
exports.default = knex;
