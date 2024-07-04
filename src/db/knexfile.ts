import { Knex } from 'knex';
import dotenv from 'dotenv';
import { getEnvNumber } from '../helpers/utils';
import mysql from 'mysql2';
import path from 'path';


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

dotenv.config();

interface IKnexConfigProps {
  [key: string]: Knex.Config;
};

// Define the database URL configuration
const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;
const mysqlPrivateConnection = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.MYSQL_PRIVATE_HOST}:${process.env.MYSQL_PRIVATE_PORT}/${process.env.MYSQL_DATABASE}`;

const connectDB = mysql.createConnection(urlDB);

const knexConfig: IKnexConfigProps = {
  production: {
    client: 'mysql',
    connection: urlDB,
    migrations: {
      directory: './src/db/migrations'
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
      directory: path.resolve(__dirname, './src/db/migrations')
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
      directory: path.resolve(__dirname, './src/db/migrations')
    }
  }
};

export default knexConfig;

