"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.fundAccount = fundAccount;
exports.transferFunds = transferFunds;
exports.withdrawFunds = withdrawFunds;
const UserModel_1 = __importDefault(require("../src/models/UserModel"));
const karmaService_1 = require("../src/services/karmaService");
const utils_1 = require("../src/helpers/utils");
// Create a new user account
async function createUser(req, res) {
    const { first_name, last_name, email, phone, next_of_kind, dob } = req.body;
    try {
        //validate the user's input details
        if (!first_name || !last_name)
            throw new Error('Oppss! Please ensure that your first and last name are correctly entered!');
        // if(!email_regex.test(email)) throw new Error('Please enter a valid email');
        // if(!phone_regex.test(phone)) throw new Error('Please enter a valid phone number');
        // if(!next_of_kind) throw new Error('Please enter the valid full name of your next of kind');
        // if(!dob) throw new Error('Please enter your date of birth in this format (DD/MM/YYYY');
        // Check if user already exists
        const existingUser = await UserModel_1.default.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Check if user is blacklisted
        const blacklisted = await (0, karmaService_1.isBlacklisted)(email);
        if (blacklisted) {
            return res.status(403).json({ message: 'Sorry, this user cannot be onboarded right now due to certain reasons. the user is likely blacklisted' });
        }
        ;
        // Create new user
        const userId = await UserModel_1.default.create({ first_name, last_name, email, phone, next_of_kind, dob, accountNo: (0, utils_1.getRandom)(10), balance: 0 });
        return res.status(201).json({ id: userId[0], message: 'User created successfully' });
    }
    catch (error) {
        console.error('Error creating user:', error);
        return res.status(403).json({ message: `${error}` });
    }
}
;
//Fund user's account/wallet, ensuring the user exists when updating their balance before attempting the operation.
async function fundAccount(req, res) {
    const { userId } = req.params;
    const { amount } = req.body;
    try {
        const user = await UserModel_1.default.findById(Number(userId));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await UserModel_1.default.updateBalance(Number(userId), amount);
        res.status(200).json({ message: 'Account funded successfully' });
    }
    catch (error) {
        console.error('Error funding user\'s account:', error);
        return res.status(500).json({ message: 'Internal server error(user\'s account funding)' });
    }
    ;
}
;
//Transfer funds, checking that both the sender and recipient exist and that the sender has enough balance.
async function transferFunds(req, res) {
    const { userId } = req.params;
    const { recipientEmail, amount } = req.body;
    try {
        const sender = await UserModel_1.default.findById(Number(userId));
        if (!sender) {
            return res.status(404).json({ message: 'Sender not found' });
        }
        if (sender.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }
        const recipient = await UserModel_1.default.findByEmail(recipientEmail);
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }
        await UserModel_1.default.updateBalance(sender.id, -amount);
        await UserModel_1.default.updateBalance(recipient.id, amount);
        res.status(200).json({ message: 'Funds transferred successfully' });
    }
    catch (error) {
        console.error('Error transfering fund:', error);
        return res.status(500).json({ message: 'Internal server error(Fund transfer)' });
    }
    ;
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
        if (user.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }
        await UserModel_1.default.updateBalance(user.id, -amount);
        res.status(200).json({ message: 'Funds withdrawn successfully' });
    }
    catch (error) {
        console.error('Error Withdrawing fund:', error);
        return res.status(500).json({ message: 'Internal server error(Fund withdrawal)' });
    }
    ;
}
;
