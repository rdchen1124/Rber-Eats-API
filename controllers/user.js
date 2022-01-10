const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../models');
const User = db.User;
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
            res.send({ok: 1});
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