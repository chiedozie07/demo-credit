import dotenv from 'dotenv';
import { Knex } from 'knex';
import path from 'path';

dotenv.config();


interface IKnexConfigProps {
  [key: string]: Knex.Config;
};

const dbUrl: string = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

const knexConfig: IKnexConfigProps = {
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
      directory: path.resolve(__dirname, 'src/db/migrations')
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
      directory: path.resolve(__dirname, 'src/db/migrations')
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
      directory: path.resolve(__dirname, 'src/db/migrations')
    }
  },

};
export default knexConfig;
