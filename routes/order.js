const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/order');
const ensureToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(authHeader !== undefined){
    const token = authHeader.split(' ')[1];
    req.token = token;
    next();
  }else{
    res.status(403).json({err: 'Auth is empty'});
  }
}
orderRouter.get('/', ensureToken, orderController.getAllOrder);
orderRouter.post('/', ensureToken, orderController.postNewOrder);

module.exports = orderRouter;