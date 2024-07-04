import { Knex } from 'knex';
import dotenv from 'dotenv';
import { getEnvNumber } from '../helpers/utils';
// import mysql from 'mysql2';
import path from 'path';


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

dotenv.config();

interface IKnexConfigProps {
  [key: string]: Knex.Config;
};

// Define the database URL configuration
const urlDB = process.env.MYSQL_URL ? process.env.MYSQL_URL : `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST || '127.0.0.1'}:${process.env.MYSQLPORT || 3306}/${process.env.MYSQLDATABASE}`;

// const connection = mysql.createConnection(urlDB);

const knexConfig: IKnexConfigProps = {
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
      directory: path.resolve(__dirname, './src/db/migrations')
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
      directory: path.resolve(__dirname, './src/db/migrations')
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
      directory: path.resolve(__dirname, './src/db/migrations')
    }
  }
};

export default knexConfig;

