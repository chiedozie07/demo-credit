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
exports.getUsers = exports.getUser = exports.withdrawFunds = exports.transferFunds = exports.fundAccount = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const karmaService_1 = require("../services/karmaService");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../helpers/utils");
const knex_1 = __importDefault(require("../db/knex"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create a new user account
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('POST Request Initiated For New User SignUp On:', req.route.path);
    const { first_name, last_name, email, phone, password, next_of_kin, dob } = req.body;
    try {
        // Validate the user's input details
        if (!first_name || !last_name)
            throw new Error('Please ensure that your first and last name are correctly entered!');
        if (!utils_1.email_regex.test(email))
            throw new Error('Please enter a valid email');
        if (!utils_1.phone_regex.test(phone))
            throw new Error('Please enter a valid phone number');
        if (!next_of_kin)
            throw new Error('Kindly enter the valid full name of your next of kin');
        if (!dob)
            throw new Error('Please enter your date of birth in this format (DD/MM/YYYY)');
        if (!password)
            throw new Error('Please choose a strong password for your account, autonumeric characters preferably!');
        // Check if user already exists
        const existingUser = yield userModel_1.default.findByEmail(email);
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });
        const phoneExist = yield userModel_1.default.isPhoneExist(phone);
        console.log('isPhoneExist', phoneExist);
        if (phoneExist)
            return res.status(400).json({ message: 'Phone already exists, kindly enter your valid phone number' });
        // Check if there's any blacklisted user with this email 
        console.log(`Checking if user with ${email} email is blacklisted...`);
        (0, karmaService_1.isUserBlacklisted)(email)
            .then(result => {
            if (result.isBlacklisted) {
                console.log('User is blacklisted:', result.data);
                return res.status(400).json({ message: `Sorry, the user with this email ${email} is likely blacklisted and cannot be onboarded at the moment due to some certain reasons.` });
            }
            else
                console.log('Therefore the user is not blacklisted!');
        })
            .catch(error => {
            console.error('Error:', error.message);
        });
        // Convert the dob from DD/MM/YYYY format to MySQL date format (YYYY-MM-DD)
        const formattedDob = dob.split('/').reverse().join('-');
        // Encrypt or hash the new user's password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create new user
        const newUserId = yield userModel_1.default.create({
            first_name,
            last_name,
            email,
            phone,
            next_of_kin,
            dob: formattedDob,
            account_no: (0, utils_1.getRandom)(10),
            balance: 0,
            logged_in: false,
            password: hashedPassword,
            user_token: null,
            token_expiration: null
        });
        // Generate JWT token for the new user
        const userToken = jsonwebtoken_1.default.sign({ userId: newUserId[0] }, process.env.ACCESS_TOKEN_KEY, { expiresIn: 3600 });
        // Get the new user's data
        const user = yield userModel_1.default.getUser(newUserId[0]);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        ;
        console.log('NEW USER CREATED ==>', 'message:', 'User created successfully', user, 'user_token:', userToken);
        return res.status(201).json({
            message: 'User created successfully',
            userData: user,
            user_token: userToken
        });
    }
    catch (error) {
        console.error('Error creating user:', error);
        return res.status(400).json({ message: error.message });
    }
});
exports.createUser = createUser;
// Fund user's account
const fundAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { amount } = req.body;
    console.log(`POST Request Initiated For ${userId} User\'s Account Funding On:`, req.route.path);
    try {
        // Validate input
        const userIdNumber = parseInt(userId, 10);
        const amountNumber = Number(amount);
        if (isNaN(userIdNumber) || userIdNumber <= 0)
            return res.status(400).json({ message: 'Invalid userId. It must be a positive number.' });
        if (amountNumber <= 0)
            return res.status(400).json({ message: 'Invalid amount. It must be a positive number.' });
        // inputs log for debugging
        console.log('fundAccount inputs:', { userIdNumber, amountNumber });
        // Check if user exists
        const user = yield userModel_1.default.findById(userIdNumber);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        // Update user's balance
        yield userModel_1.default.updateBalance(userIdNumber, amountNumber);
        // Return updated user information
        const updatedUser = yield userModel_1.default.getUser(Number(userIdNumber));
        console.log('message:', 'Account funded successfully!', 'updatedUserData:', { id: updatedUser.id, balance: updatedUser.balance, updated_at: updatedUser.updated_at });
        return res.status(200).json({
            message: 'Account funded successfully',
            amout_funded: amountNumber,
            updatedUserData: { id: updatedUser.id, balance: updatedUser.balance, updated_at: updatedUser.updated_at },
        });
    }
    catch (error) {
        console.error(`An error occured for ${userId} user\'s account funding:`, error);
        return res.status(500).json({ message: 'Internal server error!' });
    }
});
exports.fundAccount = fundAccount;
// Transfer funds, ensuring both the sender and recipient exist and the sender has enough balance.
const transferFunds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { recipientEmail, amount } = req.body;
    console.log(`POST Request Initiated For ${userId} User\'s Transfer On:`, req.route.path);
    // Validate input
    if (!userId || !recipientEmail || !amount || isNaN(amount) || amount <= 0)
        return res.status(400).json({ message: 'Invalid input data' });
    try {
        // Starting a transaction
        yield knex_1.default.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
            // Get sender details
            const sender = yield userModel_1.default.findById(Number(userId), trx);
            if (!sender || !sender.id)
                return res.status(404).json({ message: 'Sender not found' });
            // Check sender's balance
            if (sender.balance < amount)
                return res.status(400).json({ message: 'Sorry you\'re not permitted to carryout this transaction due to insufficient funds, Kindly fund your wallet first and try again!' });
            // Get recipient details
            const recipient = yield userModel_1.default.findByEmail(recipientEmail, trx);
            if (!recipient || !recipient.id)
                return res.status(404).json({ message: 'Recipient not found' });
            if (sender.id === recipient.id)
                return res.status(403).json({ message: 'Sorry, you\'re not permitted to carry out this transaction, a sender cannot be a recipient at thesame time.' });
            // Perform the fund transfer within the transaction
            yield userModel_1.default.updateBalance(sender.id, -amount, trx);
            yield userModel_1.default.updateBalance(recipient.id, amount, trx);
            // Commit the transaction
            yield trx.commit();
            // Get updated user information
            const updatedSender = yield userModel_1.default.findById(sender.id);
            const updatedRecipient = yield userModel_1.default.findByEmail(recipientEmail);
            console.log('message:', 'Funds transferred successfully', 'amount:', amount, 'updatedSenderData:', { id: updatedSender.id, balance: updatedSender.balance, updated_at: updatedSender.updated_at }, 'updatedRecipientData:', { id: updatedRecipient.id, balance: updatedRecipient.balance, updated_at: updatedRecipient.updated_at });
            return res.status(200).json({ message: 'Funds transferred successfully',
                amount_transfered: amount,
                updatedSenderData: { id: updatedSender.id, balance: updatedSender.balance, updated_at: updatedSender.updated_at }
            });
        }));
    }
    catch (error) {
        console.error('Error transferring fund:', error);
        return res.status(500).json({ message: 'Internal server error!' });
    }
});
exports.transferFunds = transferFunds;
//Withdraw Funds, ensure the user exists and has enough balance.
const withdrawFunds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { amount } = req.body;
    console.log(`POST Request Initiated For ${userId} User\'s Fund Withdrawal On:`, req.route.path);
    try {
        const user = yield userModel_1.default.findById(Number(userId));
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        //check or confirm if the user has sufficient amount to withhed
        if (user.balance < amount)
            return res.status(400).json({ message: 'Insufficient funds' });
        //debit the user's wallet/account with the amount
        yield userModel_1.default.updateBalance(user.id, -amount);
        const updatedUserData = yield userModel_1.default.findById(Number(userId));
        console.log('message:', 'Funds withdrawn successfully!', 'amount_withdrawn:', amount, 'updatedUserData:', { id: updatedUserData.id, balance: updatedUserData.balance, updated_at: updatedUserData.updated_at });
        return res.status(200).json({ message: 'Funds withdrawn successfully!',
            amount_withdrawn: amount,
            updatedUserData: { id: updatedUserData.id, balance: updatedUserData.balance, updated_at: updatedUserData.updated_at }
        });
    }
    catch (error) {
        console.error('Error Withdrawing fund:', error);
        return res.status(500).json({ message: 'Internal server error!' });
    }
    ;
});
exports.withdrawFunds = withdrawFunds;
// Get individual user
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('GET Request For User Data Initiated On:', req.route.path);
    const { userId } = req.params;
    try {
        const id = parseInt(userId, 10);
        if (isNaN(id))
            return res.status(400).json({ message: 'Invalid user ID format' });
        const user = yield userModel_1.default.findById(id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(user);
    }
    catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getUser = getUser;
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('GET Request For User\'s Meta Data Initiated On:', req.route.path);
    try {
        const users = yield userModel_1.default.getUsers();
        if (users.length === 0)
            return res.status(404).json({ message: 'No users found. Please create a user and try again.' });
        return res.status(200).json({ message: 'Successfully retrieved all users\'s data!', usersMeta: users });
    }
    catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getUsers = getUsers;
