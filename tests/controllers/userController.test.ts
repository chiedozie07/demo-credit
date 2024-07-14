import request from 'supertest';
import express, { Application } from 'express';
import { createUser, fundAccount, transferFunds, withdrawFunds } from '../../src/controllers/userController';
import UserModel from '../../src/models/userModel';
import { isUserBlacklisted } from '../../src/services/karmaService';
import dotenv from 'dotenv';

dotenv.config();

// Create an instance of the Express app
const app: Application = express();
app.use(express.json());
app.post('/createUser', createUser);
app.post('/fundAccount/:userId', fundAccount);
app.post('/transferFunds/:userId', transferFunds);
app.post('/withdrawFunds/:userId', withdrawFunds);

// Mocked data and functions
const mockUser = {
  id: 1,
  first_name: 'Chiedozie',
  last_name: 'Lawrence',
  email: 'chiedozielawrence1@example.com',
  phone: '08030000000',
  next_of_kind: 'Dozie Junior',
  dob: '1995-12-20',
  password: 'hashedPassword',
  balance: 0.00,
  // logged_in: false,
  // created_at: new Date(),
  // updated_at: new Date(),
  // user_token: '',
  // token_expiration: ''
};

// Mock UserModel methods
jest.mock('../../src/models/UserModel', () => ({
  create: jest.fn(),
  findByEmail: jest.fn(),
  getUser: jest.fn(),
  findById: jest.fn(),
  updateBalance: jest.fn(),
}));

// Mock isUserBlacklisted service
jest.mock('../../src/services/karmaService', () => ({
  isUserBlacklisted: jest.fn(),
}));

// Mock bcryptjs methods
jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashedpassword'),
}));

// Mock jsonwebtoken methods
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mockedToken'),
}));

// Test cases definition
describe('User Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // New user creation test case
  // describe('POST /createUser', () => {
  //   it('should create a new user and return status 201', async () => {
  //     (UserModel.findByEmail as jest.Mock).mockResolvedValue(undefined);
  //     (UserModel.create as jest.Mock).mockResolvedValue([1]);
  //     (UserModel.getUser as jest.Mock).mockResolvedValue({ ...mockUser, email: 'chiedozielawrence1@example.com' });
  //     (isUserBlacklisted as jest.Mock).mockResolvedValue(false);

  //     const response = await request(app)
  //       .post('/createUser')
  //       .send({
  //         first_name: 'Chiedozie',
  //         last_name: 'Lawrence',
  //         email: 'chiedozielawrence1@example.com',
  //         phone: '08030000000',
  //         next_of_kind: 'Dozie Junior',
  //         dob: '1995-12-20',
  //         password: 'hashedPassword'
  //       });

  //     expect(response.status).toBe(201);
  //     expect(response.body.message).toBe('User created successfully');
  //     expect(response.body.userData.email).toBe('chiedozielawrence1@example.com');
  //     expect(response.body.token).toBe('mockedToken');
  //   });

  //   it('should return status 400 for existing user', async () => {
  //     (UserModel.findByEmail as jest.Mock).mockResolvedValue(mockUser);

  //     const response = await request(app)
  //       .post('/createUser')
  //       .send({
  //         first_name: 'Chiedozie',
  //         last_name: 'Lawrence',
  //         email: 'chiedozielawrence1@example.com',
  //         phone: '08030000000',
  //         next_of_kind: 'Dozie Junior',
  //         dob: '1995-12-20',
  //         password: 'hashedPassword'
  //       });

  //     expect(response.status).toBe(400);
  //     expect(response.body.message).toBe('User already exists');
  //   });
  // });

//   // Account funding test case
  // describe('POST /fundAccount/:userId', () => {
  //   it('should fund user account and return status 200', async () => {
  //     (UserModel.findById as jest.Mock).mockResolvedValue(mockUser);
  //     (UserModel.updateBalance as jest.Mock).mockResolvedValue(undefined);
  //     (UserModel.getUser as jest.Mock).mockResolvedValue({ ...mockUser, balance: 200 });

  //     const response = await request(app)
  //       .post('/fundAccount/1')
  //       .send({ amount: 100 });

  //     expect(response.status).toBe(200);
  //     expect(response.body.message).toBe('Account funded successfully');
  //     expect(response.body.userData.balance).toBe(200);
  //   });

  //   it('should return status 404 if user not found', async () => {
  //     (UserModel.findById as jest.Mock).mockResolvedValue(undefined);

  //     const response = await request(app)
  //       .post('/fundAccount/1')
  //       .send({ amount: 100 });

  //     expect(response.status).toBe(404);
  //     expect(response.body.message).toBe('User not found');
  //   });
  // });

//   // Fund transfer test case
//   describe('POST /transferFunds/:userId', () => {
//     it('should transfer funds and return status 200', async () => {
//       (UserModel.findById as jest.Mock).mockResolvedValue(mockUser);
//       (UserModel.findByEmail as jest.Mock).mockResolvedValue({ ...mockUser, id: 2, email: 'recipient@example.com', balance: 50 });
//       (UserModel.updateBalance as jest.Mock).mockResolvedValue(undefined);

//       const response = await request(app)
//         .post('/transferFunds/1')
//         .send({ recipientEmail: 'recipient@example.com', amount: 50 });

//       expect(response.status).toBe(200);
//       expect(response.body.message).toBe('Funds transferred successfully');
//     });

//     it('should return status 404 if sender not found', async () => {
//       (UserModel.findById as jest.Mock).mockResolvedValue(undefined);

//       const response = await request(app)
//         .post('/transferFunds/1')
//         .send({ recipientEmail: 'recipient@example.com', amount: 50 });

//       expect(response.status).toBe(404);
//       expect(response.body.message).toBe('Sender not found');
//     });

//     it('should return status 400 for insufficient funds', async () => {
//       (UserModel.findById as jest.Mock).mockResolvedValue({ ...mockUser, balance: 30 });
//       (UserModel.findByEmail as jest.Mock).mockResolvedValue({ ...mockUser, id: 2, email: 'recipient@example.com' });

//       const response = await request(app)
//         .post('/transferFunds/1')
//         .send({ recipientEmail: 'recipient@example.com', amount: 50 });

//       expect(response.status).toBe(400);
//       expect(response.body.message).toBe('Insufficient funds');
//     });
//   });

//   // Fund withdrawal test case
//   describe('POST /withdrawFunds/:userId', () => {
//     it('should withdraw funds and return status 200', async () => {
//       (UserModel.findById as jest.Mock).mockResolvedValue(mockUser);
//       (UserModel.updateBalance as jest.Mock).mockResolvedValue(undefined);

//       const response = await request(app)
//         .post('/withdrawFunds/1')
//         .send({ amount: 50 });

//       expect(response.status).toBe(200);
//       expect(response.body.message).toBe('Funds withdrawn successfully!');
//     });

//     it('should return status 404 if user not found', async () => {
//       (UserModel.findById as jest.Mock).mockResolvedValue(undefined);

//       const response = await request(app)
//         .post('/withdrawFunds/1')
//         .send({ amount: 50 });

//       expect(response.status).toBe(404);
//       expect(response.body.message).toBe('User not found');
//     });

//     it('should return status 400 for insufficient funds', async () => {
//       (UserModel.findById as jest.Mock).mockResolvedValue({ ...mockUser, balance: 30 });

//       const response = await request(app)
//         .post('/withdrawFunds/1')
//         .send({ amount: 50 });

//       expect(response.status).toBe(400);
//       expect(response.body.message).toBe('Insufficient funds');
//     });
//   });
});