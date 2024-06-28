"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("../db/knex"));
;
//Create a new user model and transition methods
class UserModel {
    constructor() {
        this.tableName = 'users';
    }
    async create(user) {
        return (0, knex_1.default)(this.tableName).insert(user);
    }
    ;
    async findById(id) {
        return (0, knex_1.default)(this.tableName).where({ id }).first();
    }
    ;
    async findByEmail(email) {
        return (0, knex_1.default)(this.tableName).where({ email }).first();
    }
    ;
    async updateBalance(id, amount) {
        await (0, knex_1.default)(this.tableName)
            .where({ id })
            .update({ balance: knex_1.default.raw(`?? + ?`, ['balance', amount]) });
    }
    ;
}
;
exports.default = new UserModel();
