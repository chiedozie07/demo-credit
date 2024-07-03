import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Start and export the server for testing
// const server = 
app.listen(PORT, () => console.log(`DemoCredit server is running on port: http://localhost:${PORT}`));

// export default server;