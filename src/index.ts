import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 5500;
// Start and export the server for testing
// const server = 
app.listen(PORT, () => console.log(`DemoCredit server is running on port: http://localhost:${PORT}`));

// export default server;