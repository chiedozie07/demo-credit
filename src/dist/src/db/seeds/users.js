"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
//insert initial data into the 'users' table using the seed function
async function seed(knex) {
    // Deletes ALL existing entries in the 'users' table
    await knex('users').del();
    // Inserts seed entries
    await knex('users').insert([
        { firstName: 'Chiedozie', lastName: 'Lawrence', email: 'chiedozielawrence007@example.com', phone: '08061167505', next_of_kin: 'Prisca Lawrence', accountNo: '0072345522', balance: 10000.00 },
        { firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '08057474088', next_of_kin: 'Ibe Donald', accountNo: '0072345586', balance: 1000.00 },
        { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phone: '08097474086', next_of_kin: 'Joy Smith', accountNo: '0072345863', balance: 1500.00 },
        { firstName: 'Bob', lastName: 'Brown', email: 'bob@example.com', phone: '08177474009', next_of_kin: 'Loveth Brown', accountNo: '0072345509', balance: 500.00 },
        { firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', phone: '07077474088', next_of_kin: 'Jenny Johnson', accountNo: '0072345540', balance: 2000.00 }
    ]);
}
;
