"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex = require("knex");
const knexfile_1 = __importDefault(require("./knexfile"));
const environment = (process.env.NODE_ENV || 'development');
const config = knex(knexfile_1.default[environment]);
// const config = knexConfig[environment];
// const knex = Knex(config);
exports.default = config;
