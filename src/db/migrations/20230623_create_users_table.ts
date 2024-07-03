import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').unique().primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('phone').notNullable();
    table.bigInteger('account_no').unique().nullable();
    table.string('next_of_kind').notNullable();
    table.date('dob').notNullable();
    table.string('email', 255).notNullable().unique().alter();
    table.string('password').notNullable();
    table.decimal('balance').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.string('token', 255).nullable().alter();;
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
