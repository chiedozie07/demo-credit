"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phone_regex = exports.accountNo_regex = exports.email_regex = exports.password_regex = exports.formatCurrency = exports.getRandom = void 0;
// Generate random numbers
const getRandom = (length) => {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
};
exports.getRandom = getRandom;
// Format currency
const formatCurrency = (number, currencyCode = 'NGN') => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: currencyCode
    }).format(number);
};
exports.formatCurrency = formatCurrency;
// Regular expressions
exports.password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
exports.email_regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
exports.accountNo_regex = /^(?=.*[0-9])(?=.{10,})/;
exports.phone_regex = /^[\+]?[(]?[0-9]{9,13}[)]?$/;
