import { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

interface IKnexConfigProps {
  [key: string]: Knex.Config;
}

const knexConfig: IKnexConfigProps = {
  production: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations')
    }
  },
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 3306
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations')
    }
  },
  test: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 3306
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations')
    }
  }
};

export default knexConfig;
