"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
;
const dbUrl = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;
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
            directory: path_1.default.resolve(__dirname, 'src/db/migrations')
        }
    },
    staging: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT) || 3306,
            connectTimeout: 10000
        },
        migrations: {
            directory: path_1.default.resolve(__dirname, 'src/db/migrations')
        }
    },
    production: {
        client: 'mysql2',
        connection: {
            user: process.env.MYSQLUSER,
            password: process.env.MYSQLPASSWORD,
            host: process.env.MYSQLHOST,
            port: Number(process.env.MYSQLPORT),
            database: process.env.MYSQLDATABASE,
        } || dbUrl,
        migrations: {
            directory: path_1.default.resolve(__dirname, 'src/db/migrations')
        }
    },
};
exports.default = knexConfig;
