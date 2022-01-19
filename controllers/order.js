const jwt = require('jsonwebtoken');
const db = require('../models');
const Order = db.Order;
const User = db.User;
const Store = db.Store;
const private_key = 'secret';
const orderController = {
  getAllOrder: (req, res) => { // JWT test
    const token = req.token;
    jwt.verify(token, private_key, (err, decode) => {
      if(err){
        res.status(401).json({err: "jwt failed"});
      }else{
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
          attributes: ['id', 'user_info', 'order', 'remark', 'totalAmount']
        };
        if(req.query._limit){
          const limit = +req.query._limit;
          searchOption.limit = limit;
          if(req.query._page){
            const page = +req.query._page;
            const offset = (page - 1) * limit;
            searchOption.offset = offset;
          }
        }
        Order.findAndCountAll(searchOption
        ).then(data => {
          console.log('data', JSON.stringify(data, null, 4));
          res.set('X-Total-Count', data.count);
          res.json(data.rows);
        }).catch(err => {
          res.json({err: err.toString()});
        })
      }
    })

  },
  postNewOrder: (req, res) => { // JWT test
    const order = req.body;//{id, user_info, order, StoreId}
    const token = req.token;
    jwt.verify(token, private_key, (err, decode) => {
      if(err){
        res.status(401).json({err: "jwt failed"});
      }else{
        console.log('jwt:', decode);
        Order.create({
          user_info: order.user_info,
          order: order.order,
          remark: order.remark,
          totalAmount: order.totalAmount,
          UserId: decode.payload.user_id,
          StoreId: +order.StoreId
        }).then(() => {
          res.json({ok: 1});
        }).catch(err => {
          res.json({err: err.toString()});
        })
      }
    })
  }

}

module.exports = orderController;