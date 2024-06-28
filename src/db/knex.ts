import Knex from 'knex';
import knexConfig from './knexfile';

const environment = (process.env.NODE_ENV || 'development') as keyof typeof knexConfig;

const config = knexConfig[environment];

const knex = Knex(config);

export default knex;


// Replace mysql with mysql2
// import mysql from 'mysql2';
// import knexConfig from './knexfile';

// const environment = process.env.NODE_ENV || 'development';
// const config = knexConfig[environment];

// const knex = mysql.createConnection(config);

// export default knex;
