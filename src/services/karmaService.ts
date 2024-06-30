import axios from 'axios';
import dotenv from 'dotenv';


dotenv.config();

const KARMA_API_URL = process.env.KARMA_API_URL;
const KARMA_API_KEY = process.env.KARMA_API_KEY;

// check if the user is on the KARMA blacklist
export const isUserBlacklisted = async(email: string): Promise<{ isBlacklisted: boolean, data?: any }> => {
  try {
    const apiUrl = `${KARMA_API_URL}/${encodeURIComponent(email)}`;
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${KARMA_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('KARMA API Response:', response.data);
    // Check if the response status is 'success'
    if (response.data.status === 'success' && response.data.data.karma_identity || response.data.data.reporting_entity.email === email) {
      return { isBlacklisted: true, data: response.data.data };
    };
    // return false if the user is not blacklisted
    return { isBlacklisted: false };
  } catch (error: any) {
    if (error.response) {
      // handling errors and the specific http status codes gracefully
      if (error.response.status === 404) {
        console.warn('User not found in KARMA API:', email);
        return { isBlacklisted: false };
      };
      console.error('Error checking KARMA blacklist:', error.response.data);
    } else {
      console.error('Error checking KARMA blacklist:', error.message);
    }
    throw new Error(`Failed to check KARMA blacklist: ${error.message}`);
  }
};