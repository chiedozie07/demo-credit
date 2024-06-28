import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').unique().primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('phone').notNullable();
    table.bigInteger('account_no').unique().nullable(); // Assuming account_no is numeric
    table.string('next_of_kind').notNullable();
    table.date('dob').notNullable(); // Changed to date type for dob
    table.string('email').unique().notNullable();
    table.string('password').notNullable(); // Should be hashed and stored securely
    table.decimal('balance').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
