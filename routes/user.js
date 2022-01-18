const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user');

userRouter.post('/login', userController.postAuthUser);
userRouter.post('/', userController.postNewUser);
userRouter.patch('/:id', userController.patchUserFavorites);

module.exports = userRouter;