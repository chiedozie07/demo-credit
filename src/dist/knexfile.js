"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
;
const knexConfig = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT)
        },
        migrations: {
            directory: path_1.default.resolve(__dirname, 'migrations')
        }
    },
    staging: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT) || 3306
        },
        migrations: {
            directory: path_1.default.resolve(__dirname, 'migrations')
        }
    },
    production: {
        client: 'mysql2',
        connection: {
            host: process.env.MYSQLHOST,
            user: process.env.MYSQLUSER,
            password: process.env.MYSQLPASSWORD,
            database: process.env.MYSQLDATABASE,
            port: Number(process.env.MYSQLPORT) || 3306
        },
        migrations: {
            directory: path_1.default.resolve(__dirname, 'migrations')
        }
    },
};
exports.default = knexConfig;
