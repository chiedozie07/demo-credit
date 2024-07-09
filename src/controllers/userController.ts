import { Request, Response } from 'express';
import UserModel, { IUserProps } from '../models/userModel';
import { isUserBlacklisted } from '../services/karmaService';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { email_regex, phone_regex, getRandom} from '../helpers/utils';
import knex from '../db/knex';
import dotenv from 'dotenv';


dotenv.config();

// Create a new user account
export const createUser = async(req: Request, res: Response): Promise<Response> => {
  console.log('POST Request Initiated For New User SignUp On:', req.route.path);
  const { first_name, last_name, email, phone, password, next_of_kin, dob } = req.body;

  try {
    // Validate the user's input details
    if (!first_name || !last_name) throw new Error('Please ensure that your first and last name are correctly entered!');
    if (!email_regex.test(email)) throw new Error('Please enter a valid email');
    if (!phone_regex.test(phone)) throw new Error('Please enter a valid phone number');
    if (!next_of_kin) throw new Error('Kindly enter the valid full name of your next of kin');
    if (!dob) throw new Error('Please enter your date of birth in this format (DD/MM/YYYY)');
    if (!password) throw new Error('Please choose a strong password for your account, autonumeric characters preferably!');

    // Check if user already exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const phoneExist = await UserModel.isPhoneExist(phone);
    console.log('isPhoneExist', phoneExist);
    if(phoneExist) return res.status(400).json({ message: 'Phone already exists, kindly enter your valid phone number' });
    // Check if there's any blacklisted user with this email 
    console.log(`Checking if user with ${email} email is blacklisted...`);
    isUserBlacklisted(email)
    .then(result => {
      if (result.isBlacklisted) {
        console.log('User is blacklisted:', result.data);
        return res.status(400).json({ message: `Sorry, the user with this email ${email} is likely blacklisted and cannot be onboarded at the moment due to some certain reasons.` });
      } else console.log('Therefore the user is not blacklisted!');
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
    // Convert the dob from DD/MM/YYYY format to MySQL date format (YYYY-MM-DD)
    const formattedDob = dob.split('/').reverse().join('-');
    // Encrypt or hash the new user's password
    const hashedPassword = await bcryptjs.hash(password, 10);
    // Create new user
    const newUserId = await UserModel.create({
      first_name,
      last_name,
      email,
      phone,
      next_of_kin,
      dob: formattedDob,
      account_no: getRandom(10),
      balance: 0,
      password: hashedPassword
    });
    // Generate JWT token for the new user
    const userToken = jwt.sign({ userId: newUserId[0] }, process.env.ACCESS_TOKEN_KEY, { expiresIn: 3600 });
    // Get the new user's data
    const user = await UserModel.getUser(newUserId[0]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    };
    console.log('NEW USER CREATED ==>', 'message:', 'User created successfully', user, 'token:', userToken);
    return res.status(201).json({
      message: 'User created successfully',
      userData: user,
      token: userToken
    });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return res.status(400).json({ message: error.message });
  }
};

// Fund user's account
export const fundAccount = async(req: Request, res: Response): Promise<Response> =>{
  const { userId } = req.params;
  const { amount } = req.body;
  console.log(`POST Request Initiated For ${userId} User\'s Account Funding On:`, req.route.path);
  try {
    // Validate input
    const userIdNumber = parseInt(userId, 10);
    const amountNumber = Number(amount);
    if (isNaN(userIdNumber) || userIdNumber <= 0) return res.status(400).json({ message: 'Invalid userId. It must be a positive number.' });
    if (amountNumber <= 0) return res.status(400).json({ message: 'Invalid amount. It must be a positive number.' });
    // inputs log for debugging
    console.log('fundAccount inputs:', { userIdNumber, amountNumber });
    // Check if user exists
    const user = await UserModel.findById(userIdNumber);
    if (!user) return res.status(404).json({ message: 'User not found' });
    // Update user's balance
    await UserModel.updateBalance(userIdNumber, amountNumber);
    // Return updated user information
    const updatedUser = await UserModel.getUser(Number(userIdNumber));
    console.log('message:', 'Account funded successfully!', 'updatedUser:', updatedUser)
    return res.status(200).json({
      message: 'Account funded successfully',
      amout_funded: amountNumber,
      userData: updatedUser,
    });
  } catch (error) {
    console.error(`An error occured for ${userId} user\'s account funding:`, error);
    return res.status(500).json({ message: 'Internal server error!' });
  }
};

// Transfer funds, ensuring both the sender and recipient exist and the sender has enough balance.
export const transferFunds = async(req: Request, res: Response): Promise<Response> => {
  const { userId } = req.params;
  const { recipientEmail, amount } = req.body;
  console.log(`POST Request Initiated For ${userId} User\'s Transfer On:`, req.route.path);
  // Validate input
  if (!userId || !recipientEmail || !amount || isNaN(amount) || amount <= 0) return res.status(400).json({ message: 'Invalid input data' });
  try {
    // Starting a transaction
    await knex.transaction(async (trx) => {
      // Get sender details
      const sender = await UserModel.findById(Number(userId), trx);
      if (!sender || !sender.id) return res.status(404).json({ message: 'Sender not found' });
      // Check sender's balance
      if (sender.balance < amount) return res.status(400).json({ message: 'Sorry you\'re not permitted to carryout this transaction due to insufficient funds, Kindly fund your wallet first and try again!' });
      // Get recipient details
      const recipient = await UserModel.findByEmail(recipientEmail, trx);
      if (!recipient || !recipient.id) return res.status(404).json({ message: 'Recipient not found' });
      if(sender.id === recipient.id) return res.status(403).json({ message: 'Sorry, you\'re not permitted to carry out this transaction, a sender cannot be a recipient at thesame time.'});
      // Perform the fund transfer within the transaction
      await UserModel.updateBalance(sender.id, - amount, trx);
      await UserModel.updateBalance(recipient.id, amount, trx);
      // Commit the transaction
      await trx.commit();
      // Get updated user information
      const updatedSender = await UserModel.findById(sender.id);
      const updatedRecipient = await UserModel.findByEmail(recipientEmail);
      res.status(200).json({ message: 'Funds transferred successfully', amount_transfered: amount, updatedSenderData: updatedSender});
      console.log('message:', 'Funds transferred successfully', 'amount:', amount, 'updatedSenderData:', updatedSender, 'updatedRecipientData:', updatedRecipient);
    });
  } catch (error) {
    console.error('Error transferring fund:', error);
    return res.status(500).json({ message: 'Internal server error!' });
  }
};

//Withdraw Funds, ensure the user exists and has enough balance.
export const withdrawFunds = async(req: Request, res: Response): Promise<Response> => {
  const { userId } = req.params;
  const { amount } = req.body;
  console.log(`POST Request Initiated For ${userId} User\'s Fund Withdrawal On:`, req.route.path);
  try {
    const user = await UserModel.findById(Number(userId));
    if (!user) return res.status(404).json({ message: 'User not found' });
    //check or confirm if the user has sufficient amount to withhed
    if (user.balance < amount) return res.status(400).json({ message: 'Insufficient funds' });
    //debit the user's wallet/account with the amount
    await UserModel.updateBalance(user.id!, - amount);
    const updatedUserData = await UserModel.findById(Number(userId));
    console.log( 'message:', 'Funds withdrawn successfully!', 'amount_withdrawn:', amount, updatedUserData);
    return res.status(200).json({ message: 'Funds withdrawn successfully!', amount_withdrawn: amount, updatedUserData });
  } catch (error) {
    console.error('Error Withdrawing fund:', error);
    return res.status(500).json({ message: 'Internal server error!' });
  };
};

// Get individual user
export const getUser = async (req: Request, res: Response): Promise<Response> => {
  console.log('GET Request For User Data Initiated On:', req.route.path);
  const { userId } = req.params;
  try {
    const id = parseInt(userId, 10);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid user ID format' });
    const user: IUserProps | null = await UserModel.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  console.log('GET Request For User\'s Meta Data Initiated On:', req.route.path);
  try {
      const users: IUserProps[] = await UserModel.getUsers();
      if (users.length === 0) return res.status(404).json({ message: 'No users found. Please create a user and try again.' });
      return res.status(200).json({message: 'Successfully retrieved all users\'s data!', usersMeta: users});
  } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};