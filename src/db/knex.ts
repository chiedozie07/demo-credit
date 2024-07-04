import Knex from 'knex';
import knexConfig from './knexfile';

const environment = (process.env.NODE_ENV || 'development') as keyof typeof knexConfig;
const config = knexConfig[environment];
const knex = Knex(config);

export default knex;
