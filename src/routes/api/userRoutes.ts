import express from 'express';
import { createUser, fundAccount, transferFunds, withdrawFunds, getUser,  getUsers} from '../../controllers/userController';

const router = express.Router();

//user transactoon routes configurations
router.post('/users', createUser);
router.post('/users/:userId/fund', fundAccount);
router.post('/users/:userId/transfer', transferFunds);
router.post('/users/:userId/withdraw', withdrawFunds);
router.get('/users/:userId', getUser);
router.get('/users', getUsers);

export default router;
