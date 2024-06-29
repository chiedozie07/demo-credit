"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.fundAccount = fundAccount;
exports.transferFunds = transferFunds;
exports.withdrawFunds = withdrawFunds;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const karmaService_1 = require("../services/karmaService");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const utils_1 = require("../helpers/utils");
const knex_1 = __importDefault(require("../db/knex"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create a new user account
async function createUser(req, res) {
    const { first_name, last_name, email, password, phone, next_of_kind, dob } = req.body;
    try {
        // console.log('USER REG POST DATA ==>', { first_name, last_name, email, phone, next_of_kind, dob, password, });
        // Validate the user's input details
        if (!first_name || !last_name) {
            throw new Error('Please ensure that your first and last name are correctly entered!');
        }
        if (!email || !utils_1.email_regex.test(email)) {
            throw new Error('Please enter a valid email');
        }
        if (!phone || !utils_1.phone_regex.test(phone)) {
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
        const existingUser = await UserModel_1.default.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Check if user is blacklisted
        const blacklisted = await (0, karmaService_1.isBlacklisted)(email);
        if (blacklisted) {
            return res.status(400).json({ message: 'Sorry, this user cannot be onboarded right now due to certain reasons. The user is likely blacklisted' });
        }
        // Convert the dob from DD/MM/YYYY format to MySQL date format (YYYY-MM-DD)
        const formattedDob = dob.split('/').reverse().join('-');
        // Encrypt or Hash the user's password
        const hashedPassword = await bcryptjs.hash(password, 10);
        // Create new user
        const newUserId = await UserModel_1.default.create({
            first_name,
            last_name,
            email,
            phone,
            next_of_kind,
            dob: formattedDob,
            account_no: (0, utils_1.getRandom)(10),
            balance: 0,
            password: hashedPassword
        });
        // Generate JWT token for the new user
        const userToken = jwt.sign({ userId: newUserId[0] }, process.env.AUTH_KEY, { expiresIn: '1h' });
        // Get the new user's data
        const user = await UserModel_1.default.getUser(newUserId[0]);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('CREATED USER ==>', user, 'token:', userToken);
        return res.status(201).json({
            message: 'User created successfully',
            userData: user,
            token: userToken
        });
    }
    catch (error) {
        console.error('Error creating user:', error);
        return res.status(400).json({ message: error.message });
    }
}
;
//Fund user's account/wallet, ensuring the user exists when updating their balance before attempting the operation.
// export async function fundAccount(req: Request, res: Response) {
//   const { userId } = req.params;
//   const { amount } = req.body;
//   try {
//     const user = await UserModel.findById(Number(userId));
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     await UserModel.updateBalance(Number(userId), amount);
//     res.status(200).json({ message: 'Account funded successfully' });
//   } catch (error) {
//     console.error('Error funding user\'s account:', error);
//     return res.status(500).json({ message: 'Internal server error(user\'s account funding)' });
//   };
// };
// Fund user's account
async function fundAccount(req, res) {
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
        const user = await UserModel_1.default.findById(userIdNumber);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update user's balance
        await UserModel_1.default.updateBalance(userIdNumber, amountNumber);
        // Return updated user information
        const updatedUser = await UserModel_1.default.getUser(Number(userIdNumber));
        console.log('updatedUser:', updatedUser);
        return res.status(200).json({
            message: 'Account funded successfully',
            amout_funded: amountNumber,
            userData: updatedUser,
        });
    }
    catch (error) {
        console.error('Error funding user\'s account:', error);
        return res.status(500).json({ message: 'Internal server error during user\'s account funding' });
    }
}
;
// Transfer funds, ensuring both the sender and recipient exist and the sender has enough balance.
async function transferFunds(req, res) {
    const { userId } = req.params;
    const { recipientEmail, amount } = req.body;
    // Validate input
    if (!userId || !recipientEmail || !amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: 'Invalid input data' });
    }
    try {
        // Start a transaction
        await knex_1.default.transaction(async (trx) => {
            // Get sender details
            const sender = await UserModel_1.default.findById(Number(userId), trx);
            if (!sender || !sender.id) {
                return res.status(404).json({ message: 'Sender not found' });
            }
            // Check sender's balance
            if (sender.balance < amount) {
                return res.status(400).json({ message: 'Insufficient funds' });
            }
            // Get recipient details
            const recipient = await UserModel_1.default.findByEmail(recipientEmail, trx);
            if (!recipient || !recipient.id) {
                return res.status(404).json({ message: 'Recipient not found' });
            }
            // Perform the fund transfer within the transaction
            await UserModel_1.default.updateBalance(sender.id, -amount, trx);
            await UserModel_1.default.updateBalance(recipient.id, amount, trx);
            // Commit the transaction
            await trx.commit();
            // Get updated user information
            const updatedSender = await UserModel_1.default.findById(sender.id);
            const updatedRecipient = await UserModel_1.default.findByEmail(recipientEmail);
            console.log('message:', 'Funds transferred successfully', 'amount:', amount, 'updatedSenderData:', updatedSender, 'updatedRecipientData:', updatedRecipient);
            res.status(200).json({
                message: 'Funds transferred successfully',
                amount_transfered: amount,
                updatedSenderData: updatedSender,
            });
        });
    }
    catch (error) {
        console.error('Error transferring fund:', error);
        return res.status(500).json({ message: 'Internal server error (Fund transfer)' });
    }
}
;
//Withdraw Funds, ensure the user exists and has enough balance.
async function withdrawFunds(req, res) {
    const { userId } = req.params;
    const { amount } = req.body;
    try {
        const user = await UserModel_1.default.findById(Number(userId));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        //check or confirm if the user has sufficient amount to withhed
        if (user.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }
        //debit the user's wallet/account with the amount
        await UserModel_1.default.updateBalance(user.id, -amount);
        console.log('message:', 'Funds withdrawn successfully!', 'amount_withdrawn:', amount, 'updatedUserData:', user);
        return res.status(200).json({ message: 'Funds withdrawn successfully!', amount_withdrawn: amount, updatedUserData: user });
    }
    catch (error) {
        console.error('Error Withdrawing fund:', error);
        return res.status(500).json({ message: 'Internal server error(Fund withdrawal)' });
    }
    ;
}
;
