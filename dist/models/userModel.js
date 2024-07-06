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
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, knex_1.default)(this.tableName).insert(user);
        });
    }
    // Exclude password when fetching by ID
    findById(id, trx) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = trx ? trx(this.tableName) : (0, knex_1.default)(this.tableName);
            return query.select('id', 'first_name', 'last_name', 'email', 'phone', 'next_of_kind', 'dob', 'account_no', 'balance', 'created_at', 'updated_at')
                .where({ id }).first();
        });
    }
    // Exclude password when fetching by email
    findByEmail(email, trx) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = trx ? trx(this.tableName) : (0, knex_1.default)(this.tableName);
            return query.select('id', 'first_name', 'last_name', 'email', 'phone', 'next_of_kind', 'dob', 'account_no', 'balance', 'created_at', 'updated_at')
                .where({ email }).first();
        });
    }
    ;
    //update the user's account balance with the amount
    updateBalance(id, amount, trx) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = trx ? trx(this.tableName) : (0, knex_1.default)(this.tableName);
            yield query.where({ id })
                .update({
                balance: knex_1.default.raw('balance + ?', [amount]),
                updated_at: knex_1.default.fn.now()
            });
        });
    }
    ;
    // Get a list of all users excluding passwords
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, knex_1.default)(this.tableName)
                .select('id', 'first_name', 'last_name', 'email', 'phone', 'account_no', 'next_of_kind', 'dob', 'balance', 'created_at', 'updated_at');
        });
    }
    // Get a user by ID excluding password
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, knex_1.default)(this.tableName)
                .where({ id })
                .select('id', 'first_name', 'last_name', 'email', 'phone', 'account_no', 'next_of_kind', 'dob', 'balance', 'created_at', 'updated_at')
                .first();
        });
    }
}
exports.default = new UserModel();
