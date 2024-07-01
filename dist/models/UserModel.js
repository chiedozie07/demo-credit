"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("../db/knex"));
;
// Create a new user model and transaction methods
class UserModel {
    constructor() {
        this.tableName = 'users';
    }
    async create(user) {
        return (0, knex_1.default)(this.tableName).insert(user);
    }
    ;
    // Exclude password when fetching by ID
    async findById(id, trx) {
        const query = trx ? trx(this.tableName) : (0, knex_1.default)(this.tableName);
        return query.select('id', 'first_name', 'last_name', 'email', 'phone', 'next_of_kind', 'dob', 'account_no', 'balance', 'created_at', 'updated_at')
            .where({ id }).first();
    }
    // Exclude password when fetching by email
    async findByEmail(email, trx) {
        const query = trx ? trx(this.tableName) : (0, knex_1.default)(this.tableName);
        return query.select('id', 'first_name', 'last_name', 'email', 'phone', 'next_of_kind', 'dob', 'account_no', 'balance', 'created_at', 'updated_at')
            .where({ email }).first();
    }
    ;
    //update the user's account balance with the amount
    async updateBalance(id, amount, trx) {
        const query = trx ? trx(this.tableName) : (0, knex_1.default)(this.tableName);
        await query.where({ id })
            .update({
            balance: knex_1.default.raw('balance + ?', [amount]),
            updated_at: knex_1.default.fn.now()
        });
    }
    ;
    // Get a list of all users excluding passwords
    async getUsers() {
        return (0, knex_1.default)(this.tableName)
            .select('id', 'first_name', 'last_name', 'email', 'phone', 'account_no', 'next_of_kind', 'dob', 'balance', 'created_at', 'updated_at');
    }
    ;
    // Get a user by ID excluding password
    async getUser(id) {
        return (0, knex_1.default)(this.tableName)
            .where({ id })
            .select('id', 'first_name', 'last_name', 'email', 'phone', 'account_no', 'next_of_kind', 'dob', 'balance', 'created_at', 'updated_at')
            .first();
    }
    ;
}
;
exports.default = new UserModel();
