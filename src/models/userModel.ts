import knex from '../db/knex';


// define user prop types
export interface IUserProps {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  account_no: string | number;
  balance: number;
  next_of_kin: string;
  dob: string;
  logged_in?: boolean;
  created_at?: Date;
  updated_at?: Date;
  user_token?: string;
  token_expiration?: Date | number;
};

// Create a new user model and transaction methods
class UserModel {
  private tableName: string = 'users';

  public async create(user: IUserProps): Promise<number[]> {
    return knex(this.tableName).insert(user);
  };
  
// Exclude password when fetching by ID
public async findById(id: number, trx?: any): Promise<IUserProps | undefined> {
  const query = trx ? trx(this.tableName) : knex(this.tableName);
  return query.select('id', 'first_name', 'last_name', 'email', 'phone', 'next_of_kin', 'dob', 'account_no', 'balance', 'created_at', 'updated_at')
    .where({ id }).first();
};

// Exclude password when fetching by email
public async findByEmail(email: string, trx?: any): Promise<IUserProps | undefined> {
  const query = trx ? trx(this.tableName) : knex(this.tableName);
  return query.select('id', 'first_name', 'last_name', 'email', 'phone', 'next_of_kin', 'dob', 'account_no', 'balance', 'created_at', 'updated_at')
    .where({ email }).first();
};

// Check if user's phone exist
public async isPhoneExist(phone: string): Promise<IUserProps[] | boolean> {
  if (!phone) {
    console.error('Phone number is required, but was not provided.');
    throw new Error('Phone number is required');
  };
  try {
    const query = knex(this.tableName);
    const usersPhone = await query.select('phone');
    const isPhoneExist = usersPhone.some(user => user.phone === phone);
    return isPhoneExist;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  };
};

//update the user's account balance with the amount
public async updateBalance(id: number, amount: number, trx?: any): Promise<void> {
  const query = trx ? trx(this.tableName) : knex(this.tableName);
  await query.where({ id })
    .update({
      balance: knex.raw('balance + ?', [amount]),
      updated_at: knex.fn.now()
    });
};
  // Get a list of all users excluding passwords
  public async getUsers(): Promise<IUserProps[]> {
    return knex(this.tableName)
      .select('id', 'first_name', 'last_name', 'email', 'phone', 'account_no', 'next_of_kin', 'dob', 'balance', 'created_at', 'updated_at');
  };

   // Get a user by ID excluding password
  public async getUser(id: number): Promise<IUserProps | undefined> {
    return knex(this.tableName)
      .where({ id })
      .select('id', 'first_name', 'last_name', 'email', 'phone', 'account_no', 'next_of_kin', 'dob', 'balance', 'created_at', 'updated_at')
      .first();
  };
};

export default new UserModel();
