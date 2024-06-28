import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const KARMA_API_URL = process.env.KARMA_API_BASE_URL;
const KARMA_API_KEY = process.env.KARMA_API_KEY;

export async function isBlacklisted(email: string): Promise<boolean> {
  try {
    const response = await axios.post(
      KARMA_API_URL!,
      { email },
      { headers: { 'Authorization': `Bearer ${KARMA_API_KEY}` } }
    );
    console.log('Blacklisted Data Response ==>', response);
    return response.data.blacklisted;
  } catch (error) {
    console.error('Error checking blacklist status:', error);
    return false;
  }
}
