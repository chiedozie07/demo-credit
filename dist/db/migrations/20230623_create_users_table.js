"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').unique().primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('phone').notNullable();
        table.bigInteger('account_no').unique().nullable();
        table.string('next_of_kind').notNullable();
        table.date('dob').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.decimal('balance').defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.string('token', 255).unique().nullable();
    });
}
async function down(knex) {
    await knex.schema.dropTable('users');
}
