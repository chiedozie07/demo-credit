"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('phone').notNullable();
        table.string('accountNo').nullable();
        table.string('next_of_kind').notNullable();
        table.string('dob').notNullable();
        table.string('email').unique().notNullable();
        table.decimal('balance', 14, 2).defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}
async function down(knex) {
    await knex.schema.dropTable('users');
}
;
