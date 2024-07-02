import app from './app';
import dotenv from 'dotenv';
// import http from 'http';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Start the server
const server = app.listen(PORT, () => console.log(`DemoCredit server is running on port: http://localhost:${PORT}`));