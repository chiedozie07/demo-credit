// Generate random numbers
export const getRandom = (length: number): number => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  );
};

// Format currency
export const formatCurrency = (number: number, currencyCode = 'NGN'): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currencyCode
  }).format(number);
};

// Regular expressions
export const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
export const email_regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
export const accountNo_regex = /^(?=.*[0-9])(?=.{10,})/;
export const phone_regex = /^[\+]?[(]?[0-9]{9,13}[)]?$/;
