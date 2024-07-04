"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// import mysql from 'mysql2';
const path_1 = __importDefault(require("path"));
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
dotenv_1.default.config();
;
// Define the database URL configuration
const urlDB = process.env.MYSQL_URL ? process.env.MYSQL_URL : `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST || '127.0.0.1'}:${process.env.MYSQLPORT || 3306}/${process.env.MYSQLDATABASE}`;
// const connection = mysql.createConnection(urlDB);
const knexConfig = {
    production: {
        client: 'mysql2',
        connection: urlDB || {
            host: process.env.MYSQLHOST || '127.0.0.1',
            user: process.env.MYSQLUSER,
            password: process.env.MYSQLPASSWORD,
            database: process.env.MYSQLDATABASE,
            port: parseInt(process.env.MYSQLPORT) || 3306,
            // connectTimeout: 10000,
        },
        migrations: {
            directory: path_1.default.resolve(__dirname, './src/db/migrations')
        },
    },
    development: {
        client: "mysql2",
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: path_1.default.resolve(__dirname, './src/db/migrations')
        }
    },
    test: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: path_1.default.resolve(__dirname, './src/db/migrations')
        }
    }
};
exports.default = knexConfig;
