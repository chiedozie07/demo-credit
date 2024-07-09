import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Drop the existing table if it exists (safety measure)
  // await knex.schema.dropTableIfExists('users');
  
  // Create the new users table with correct schema
  await knex.schema.createTable('users', (table) => {
    table.increments('id').unique().primary();
    table.string('first_name').notNullable(); 
    table.string('last_name').notNullable();
    table.string('phone').notNullable(); 
    table.string('account_no').unique().nullable(); 
    table.string('next_of_kin').notNullable(); 
    table.date('dob').notNullable(); 
    table.string('email', 255).unique().notNullable(); 
    table.string('password').notNullable(); 
    table.decimal('balance').defaultTo(0); 
    table.timestamp('created_at').defaultTo(knex.fn.now()); 
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.string('token', 255).nullable(); 
    table.timestamps(true, true); 
  });
};

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
};
