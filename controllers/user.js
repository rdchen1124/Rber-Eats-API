const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;
const private_key = 'secret';
const userController = {
  getAuthUser: (req, res) => {
    const {username, password} = req.query;
    User.findOne({
      where: {
        username
      }
    }).then(user => {
      if(!user){
        res.send({err: `${username} is not defined.`});
      }else{
        bcrypt.compare(password, user.password
        ).then(result => {
          if(result){
            const payload = {
              user_id: user.id,
              user_name: user.username
            };
            const token = jwt.sign({payload, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12)}, private_key);
            res.send({ok: 1, token});
          }else{
            res.send({err: 'password is incorrect.'});
          }
        })
      }
    }).catch(err => {
      res.send({err: err.toString()});
    })
  },
  postNewUser: (req, res) => {
    const user = {
      username: req.body.username,
      password: req.body.password
    };
    bcrypt.hash(user.password, saltRounds
    ).then(hash => {
      User.create({
        username: user.username,
        password: hash
      }).then(() => {
        res.json({ok: 1});
      }).catch(err => {
        res.json({err: err.toString()});
      })
    }).catch(err => {
      res.json({err: err.toString()});
    });
  }
}

module.exports = userController;