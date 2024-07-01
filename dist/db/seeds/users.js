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
exports.seed = seed;
//insert initial data into the 'users' table using the seed function
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries in the 'users' table
        yield knex('users').del();
        // Inserts seed entries
        yield knex('users').insert([
            { first_name: 'Chiedozie', last_name: 'Lawrence', email: 'chiedozielawrence007@gmail.com', password: 'pas12334', phone: '08061167505', next_of_kin: 'Prisca Lawrence', dob: '19/04/1989', balance: 10000.00 },
            { first_name: 'John', last_name: 'Doe', email: 'john@gmail.com', password: 'pas127634', phone: '08057474088', next_of_kin: 'Ibe Donald', dob: '20/07/1981', balance: 1000.00 },
            { first_name: 'Jane', last_name: 'Smith', email: 'jane@gmail.com', password: 'pa12334', phone: '08097474086', next_of_kin: 'Joy Smith', dob: '23/04/2009', balance: 1500.00 },
            { first_name: 'Bob', last_name: 'Brown', email: 'bob@gmail.com', password: 'uys12334', phone: '08177474009', next_of_kin: 'Loveth Brown', dob: '10/02/1991', balance: 500.00 },
            { first_name: 'Alice', last_name: 'Johnson', email: 'alice@gmail.com', password: 'pas176334', phone: '07077474088', next_of_kin: 'Jenny Johnson', dob: '17/07/2002', balance: 2000.00 }
        ]);
    });
}
;
