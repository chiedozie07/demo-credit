"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../controllers/userController");
const router = express_1.default.Router();
//user transactoon routes configurations
router.post('/users', userController_1.createUser);
router.post('/users/:userId/fund', userController_1.fundAccount);
router.post('/users/:userId/transfer', userController_1.transferFunds);
router.post('/users/:userId/withdraw', userController_1.withdrawFunds);
router.get('/users/:userId', userController_1.getUser);
router.get('/users', userController_1.getUsers);
exports.default = router;
