import express from 'express';
import { createUser, fundAccount, transferFunds, withdrawFunds } from '../../../controllers/userController';

const router = express.Router();

//routes configurations
router.post('/users', createUser);
router.post('/users/:userId/fund', fundAccount);
router.post('/users/:userId/transfer', transferFunds);
router.post('/users/:userId/withdraw', withdrawFunds);

export default router;
