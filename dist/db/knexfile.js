"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../helpers/utils");
const path_1 = __importDefault(require("path"));
// import mysql from 'mysql2';
dotenv_1.default.config();
;
// Define the database URL configuration
const dbConnectionUrl = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;
// const mysqlPrivateConnection = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.MYSQL_PRIVATE_HOST}:${process.env.MYSQL_PRIVATE_PORT}/${process.env.MYSQL_DATABASE}`;
// const connectDB = mysql.createConnection(dbConnectionUrl);
const knexConfig = {
    production: {
        client: 'mysql',
        connection: {
            user: process.env.MYSQLUSER,
            password: process.env.MYSQLPASSWORD,
            host: process.env.MYSQLHOST,
            port: Number(process.env.MYSQLPORT) || (0, utils_1.getEnvNumber)(process.env.MYSQLPORT),
            database: process.env.MYSQLDATABASE
        } || dbConnectionUrl,
        migrations: {
            directory: 'src/db/migrations'
        },
    },
    development: {
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: path_1.default.resolve(__dirname, 'src/db/migrations')
        }
    },
    test: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: path_1.default.resolve(__dirname, 'src/db/migrations')
        }
    }
};
exports.default = knexConfig;
