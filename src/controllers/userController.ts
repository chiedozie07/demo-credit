import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import { isBlacklisted, getBlacklistedUsersData } from '../services/karmaService';
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { email_regex, phone_regex, getRandom} from '../helpers/utils';
import knex from '../db/knex';
import dotenv from 'dotenv';


dotenv.config();

// Create a new user account
export async function createUser(req: Request, res: Response) {
  const { first_name, last_name, email, password, phone, next_of_kind, dob } = req.body;

  try {
    // console.log('USER REG POST DATA ==>', { first_name, last_name, email, phone, next_of_kind, dob, password, });

    // Validate the user's input details
    if (!first_name || !last_name) {
      throw new Error('Please ensure that your first and last name are correctly entered!');
    }
    if (!email || !email_regex.test(email)) {
      throw new Error('Please enter a valid email');
    }
    if (!phone || !phone_regex.test(phone)) {
      throw new Error('Please enter a valid phone number');
    }
    if (!next_of_kind) {
      throw new Error('Kindly enter the valid full name of your next of kin');
    }
    if (!dob) {
      throw new Error('Please enter your date of birth in this format (DD/MM/YYYY)');
    }
    if (!password) {
      throw new Error('Please choose a strong password for your account, autonumeric characters preferably!');
    }

    // Check if user already exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if user is blacklisted
    const isBlacklisted = await getBlacklistedUsersData(email);
    if (isBlacklisted) {
      console.log(`User with email ${email} is blacklisted.`);
      return res.status(400).json({ message: `Sorry, user with this email ${email} is likely blacklisted and cannot be onboarded at the moment due to certain reasons.` });
    } else console.log(`User with email ${email} is not blacklisted.`);

    // const blacklisted = await isBlacklisted(email);
    // if (blacklisted) {
    //   return res.status(400).json({ message: 'Sorry, this user cannot be onboarded right now due to certain reasons. The user is likely blacklisted' });
    // };

    // Convert the dob from DD/MM/YYYY format to MySQL date format (YYYY-MM-DD)
    const formattedDob = dob.split('/').reverse().join('-');

    // Encrypt or Hash the user's password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user
    const newUserId = await UserModel.create({
      first_name,
      last_name,
      email,
      phone,
      next_of_kind,
      dob: formattedDob,
      account_no: getRandom(10),
      balance: 0,
      password: hashedPassword
    });

    // Generate JWT token for the new user
    const userToken = jwt.sign({ userId: newUserId[0] }, process.env.AUTH_KEY, { expiresIn: '1h' });
    // Get the new user's data
    const user = await UserModel.getUser(newUserId[0]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('CREATED USER ==>', user, 'token:', userToken);
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
export async function fundAccount(req: Request, res: Response) {
  const { userId } = req.params;
  const { amount } = req.body;

  try {
    // Validate input
    const userIdNumber = parseInt(userId, 10);
    const amountNumber = Number(amount);
    if (isNaN(userIdNumber) || userIdNumber <= 0) {
      return res.status(400).json({ message: 'Invalid userId. It must be a positive number.' });
    }

    if (isNaN(amountNumber) || amountNumber <= 0) {
      return res.status(400).json({ message: 'Invalid amount. It must be a positive number.' });
    }

    // Log inputs for debugging
    console.log('fundAccount inputs:', { userIdNumber, amountNumber });

    // Check if user exists
    const user = await UserModel.findById(userIdNumber);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's balance
    await UserModel.updateBalance(userIdNumber, amountNumber);
    // Return updated user information
    const updatedUser = await UserModel.getUser(Number(userIdNumber));
    console.log('updatedUser:', updatedUser)
    return res.status(200).json({
      message: 'Account funded successfully',
      amout_funded: amountNumber,
      userData: updatedUser,
    });
  } catch (error) {
    console.error('Error funding user\'s account:', error);
    return res.status(500).json({ message: 'Internal server error during user\'s account funding' });
  }
};

// Transfer funds, ensuring both the sender and recipient exist and the sender has enough balance.
export async function transferFunds(req: Request, res: Response) {
  const { userId } = req.params;
  const { recipientEmail, amount } = req.body;

  // Validate input
  if (!userId || !recipientEmail || !amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    // Start a transaction
    await knex.transaction(async (trx) => {
      // Get sender details
      const sender = await UserModel.findById(Number(userId), trx);
      if (!sender || !sender.id) {
        return res.status(404).json({ message: 'Sender not found' });
      }

      // Check sender's balance
      if (sender.balance < amount) {
        return res.status(400).json({ message: 'Sorry you\'re not permitted to carryout this transaction due to insufficient funds, Kindly fund your wallet first and try again!' });
      }

      // Get recipient details
      const recipient = await UserModel.findByEmail(recipientEmail, trx);
      if (!recipient || !recipient.id) {
        return res.status(404).json({ message: 'Recipient not found' });
      }

      // Perform the fund transfer within the transaction
      await UserModel.updateBalance(sender.id, - amount, trx);
      await UserModel.updateBalance(recipient.id, amount, trx);

      // Commit the transaction
      await trx.commit();

      // Get updated user information
      const updatedSender = await UserModel.findById(sender.id);
      const updatedRecipient = await UserModel.findByEmail(recipientEmail);
      console.log('message:', 'Funds transferred successfully', 'amount:', amount, 'updatedSenderData:', updatedSender, 'updatedRecipientData:', updatedRecipient);

      res.status(200).json({ 
        message: 'Funds transferred successfully', 
        amount_transfered: amount, 
        updatedSenderData: updatedSender, 
      });
    });
  } catch (error) {
    console.error('Error transferring fund:', error);
    return res.status(500).json({ message: 'Internal server error (Fund transfer)' });
  }
};

//Withdraw Funds, ensure the user exists and has enough balance.
export async function withdrawFunds(req: Request, res: Response) {
  const { userId } = req.params;
  const { amount } = req.body;
  
  try {
    const user = await UserModel.findById(Number(userId));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    //check or confirm if the user has sufficient amount to withhed
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }
    //debit the user's wallet/account with the amount
    await UserModel.updateBalance(user.id!, - amount);
    console.log( 'message:', 'Funds withdrawn successfully!', 'amount_withdrawn:', amount, 'updatedUserData:', user);
    return res.status(200).json({ message: 'Funds withdrawn successfully!', amount_withdrawn: amount, updatedUserData: user });
  } catch (error) {
    console.error('Error Withdrawing fund:', error);
    return res.status(500).json({ message: 'Internal server error(Fund withdrawal)' });
  };
};

