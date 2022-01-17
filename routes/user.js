const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user');

userRouter.get('/', userController.getAuthUser);
userRouter.post('/', userController.postNewUser);
userRouter.patch('/:id', userController.patchUserFavorites);

module.exports = userRouter;