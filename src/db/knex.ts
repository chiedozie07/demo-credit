const knex = require("knex");
import knexConfig from './knexfile';



const environment = (process.env.NODE_ENV || 'development') as keyof typeof knexConfig;
const config = knex(knexConfig[environment]);

// const config = knexConfig[environment];
// const knex = Knex(config);

export default config;