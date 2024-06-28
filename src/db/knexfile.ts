import { Knex } from 'knex';
import dotenv from 'dotenv';
// import migration from './src/db/migrations/20230623_create_users_table';

dotenv.config();

interface IKnexConfigProps {
  [key: string]: Knex.Config;
};

const knexConfig: IKnexConfigProps = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '@techGuru.123',
      database: 'demo_credit_wallet'
    },
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
};

export default knexConfig;