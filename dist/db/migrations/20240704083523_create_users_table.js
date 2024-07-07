"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Drop the existing table if it exists (safety measure)
        // await knex.schema.dropTableIfExists('users');
        // Create the new users table with correct schema
        yield knex.schema.createTable('users', (table) => {
            table.increments('id').unique().primary();
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.string('phone').unique().notNullable();
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
    });
}
;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTableIfExists('users');
    });
}
;
