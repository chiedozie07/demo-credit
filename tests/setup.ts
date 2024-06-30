import knex from '../src/db/knex';

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

afterAll(async () => {
  await knex.destroy();
});
