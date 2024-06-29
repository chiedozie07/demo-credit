import axios from 'axios';
import dotenv from 'dotenv';


dotenv.config();

// Constants
const KARMA_API_URL = process.env.KARMA_API_BASE_URL;
const KARMA_API_KEY = process.env.KARMA_API_KEY;


// Get blacklisted users data
export async function getBlacklistedUsersData(blacklistedEmail: string): Promise<boolean> {
  try {
    const response = await axios.get(KARMA_API_URL!);
    if (response.status !== 200) throw new Error('Failed to retrieve data from Karma API');
    console.log('Blacklisted Data Response:', response.data);
    // Check if the user with the email is blacklisted
    const isUserBlacklisted = response.data.some((user: any) => user.email === blacklistedEmail);
    if (isUserBlacklisted) console.log('User is blacklisted:', blacklistedEmail);
    return isUserBlacklisted;
  } catch (error: any) {
    console.error('Error checking blacklist status:', error);
    throw new Error(`Failed to check blacklist status: ${error.message}`);
  }
};

export async function isBlacklisted(email: string): Promise<boolean> {
  try {
    const response = await axios.post(
      KARMA_API_URL!,
      { email },
      { headers: { 'Authorization': `Bearer ${KARMA_API_KEY}` } }
    );
    console.log('Blacklisted Data Response:', response);
    return response.data.blacklisted;
  } catch (error) {
    console.error('Error checking blacklist status:', error);
    return false;
  }
};
