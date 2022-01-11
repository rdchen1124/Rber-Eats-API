const jwt = require('jsonwebtoken');
const db = require('../models');
const Order = db.Order;
const User = db.User;
const Store = db.Store;
const private_key = 'secret';
const orderController = {
  getAllOrder: (req, res) => { // JWT test
    const authHeader = req.headers.authorization;
    if(authHeader !== undefined){
      const token = authHeader.split(' ')[1];
      jwt.verify(token, private_key, (err, decode) => {
        if(err){
          res.json({err: err.toString()});
        }else{
          console.log('jwt:', decode);
          let searchOption = {
            order: [
              ['id', 'DESC']
            ],
            where: {
              UserId: decode.payload.user_id
            },
            include: [
              {model: User, attributes: ['id', 'username'], as: "user"},
              {model: Store, attributes: ['id', 'name'], as: "store"}
            ],
            attributes: ['id', 'user_info', 'order', 'createdAt']
          };
          if(req.query._limit){
            const limit = +req.query._limit;
            searchOption.limit = limit;
          }
          Order.findAll(searchOption
          ).then(data => {
            console.log('data', JSON.stringify(data, null, 4));
            // console.log('createdAt', data[0].order);
            // const orders = JSON.parse(JSON.parse(data[0].order));
            // console.log('order', orders[0]);
            res.json(data);
          }).catch(err => {
            res.json({err: err.toString()});
          })
        }
      })
    }else{
      res.json({err: 'Auth is empty'});
    }
  },
  postNewOrder: (req, res) => { // JWT test
    const order = req.body;//{id, user_info, order, StoreId}
    const authHeader = req.headers.authorization;
    if(authHeader !== undefined){
      const token = authHeader.split(' ')[1];
      jwt.verify(token, private_key, (err, decode) => {
        if(err){
          res.json({err: err.toString()});
        }else{
          console.log('jwt:', decode);
          Order.create({
            user_info: order.user_info,
            order: order.order,
            UserId: decode.payload.user_id,
            StoreId: +order.store_id
          }).then(() => {
            res.json({ok: 1});
          }).catch(err => {
            res.json({err: err.toString()});
          })
        }
      })
    }else{
      res.json({err: 'Auth is empty'});
    }
  }

}

module.exports = orderController;