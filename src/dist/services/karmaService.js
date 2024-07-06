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
exports.isUserBlacklisted = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const KARMA_API_URL = process.env.KARMA_API_URL;
const KARMA_API_KEY = process.env.KARMA_API_KEY;
// check if the user is on the KARMA blacklist
const isUserBlacklisted = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiUrl = `${KARMA_API_URL}/${encodeURIComponent(email)}`;
        const response = yield axios_1.default.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${KARMA_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('KARMA API Response:', response.data);
        // Check if the response status is 'success'
        if (response.data.status === 'success' && response.data.data.karma_identity || response.data.data.reporting_entity.email === email) {
            return { isBlacklisted: true, data: response.data.data };
        }
        ;
        // return false if the user is not blacklisted
        return { isBlacklisted: false };
    }
    catch (error) {
        if (error.response) {
            // handling errors and the specific http status codes gracefully
            if (error.response.status === 404) {
                console.warn('User not found in KARMA API:', email);
                return { isBlacklisted: false };
            }
            ;
            console.error('Error checking KARMA blacklist:', error.response.data);
        }
        else {
            console.error('Error checking KARMA blacklist:', error.message);
        }
        throw new Error(`Failed to check KARMA blacklist: ${error.message}`);
    }
});
exports.isUserBlacklisted = isUserBlacklisted;
