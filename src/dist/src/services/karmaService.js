"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlacklisted = isBlacklisted;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const KARMA_API_URL = process.env.KARMA_API_BASE_URL;
const KARMA_API_KEY = process.env.KARMA_API_KEY;
async function isBlacklisted(email) {
    try {
        const response = await axios_1.default.post(KARMA_API_URL, { email }, { headers: { 'Authorization': `Bearer ${KARMA_API_KEY}` } });
        console.log('Blacklisted Data Response ==>', response);
        return response.data.blacklisted;
    }
    catch (error) {
        console.error('Error checking blacklist status:', error);
        return false;
    }
}
