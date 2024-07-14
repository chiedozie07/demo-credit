import dotenv from 'dotenv';
import Knex from 'knex';
import knexConfig from './knexfile';

dotenv.config();

const environment = (process.env.NODE_ENV || 'development') as keyof typeof knexConfig;
const config = knexConfig[environment];
const knex = Knex(config);

export default knex;
