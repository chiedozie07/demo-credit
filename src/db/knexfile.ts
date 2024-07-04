import { Knex } from 'knex';
import dotenv from 'dotenv';
// import { getEnvNumber } from '../helpers/utils';
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
const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;
const mysqlPrivateConnection = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.MYSQL_PRIVATE_HOST}:${process.env.MYSQL_PRIVATE_PORT}/${process.env.MYSQL_DATABASE}`;

const knexConfig: IKnexConfigProps = {
  production: {
    client: 'mysql',
    connection: urlDB || mysqlPrivateConnection,
    migrations: {
      directory: path.resolve(__dirname, './src/db/migrations')
    },
  }
};

export default knexConfig;

