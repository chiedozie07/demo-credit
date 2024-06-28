import { Knex } from 'knex';
import knex from '../db/knex';

// User interface props definition
export interface IUserProps {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  account_no: string | number;
  balance: number;
  next_of_kind: string;
  dob: string;
  created_at?: Date;
  updated_at?: Date;
}

// Create a new user model and transaction methods
class UserModel {
  private tableName: string = 'users';

  public async create(user: IUserProps): Promise<number[]> {
    return knex(this.tableName).insert(user);
  };

  public async findById(id: number, trx?: any): Promise<IUserProps | undefined> {
    return trx ?
      trx(this.tableName).where({ id }).first() :
      knex(this.tableName).where({ id }).first();
  };

  public async findByEmail(email: string, trx?: any): Promise<IUserProps | undefined> {
    return trx ?
      trx(this.tableName).where({ email }).first() :
      knex(this.tableName).where({ email }).first();
  };

  public async updateBalance(id: number, amount: number, trx?: any): Promise<void> {
    const query = trx ? trx(this.tableName) : knex(this.tableName);
    await query.where({ id })
      .update({
        balance: knex.raw('balance + ?', [amount]),
        updated_at: knex.fn.now() // Update the updated_at field
      });
  };
  // Get a list of all users excluding passwords
  public async getUsers(): Promise<IUserProps[]> {
    return knex(this.tableName)
      .select('id', 'first_name', 'last_name', 'email', 'phone', 'account_no', 'next_of_kind', 'dob', 'balance', 'created_at', 'updated_at');
  };

  // Get a user by ID excluding password
  public async getUser(id: number): Promise<IUserProps | undefined> {
    return knex(this.tableName)
      .where({ id })
      .select('id', 'first_name', 'last_name', 'email', 'phone', 'account_no', 'next_of_kind', 'dob', 'balance', 'created_at', 'updated_at')
      .first();
  };

};

export default new UserModel();
