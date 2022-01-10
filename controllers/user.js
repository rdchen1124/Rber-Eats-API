const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;
const user_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6InVzZXIifSwiZXhwIjoxNjQxODEwMjk1LCJpYXQiOjE2NDE4MDY2OTV9.rk40jwkNjpCQooLAO_Gc4bcOdKdgGxP_96kbMh8pI9E';
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
            const token = jwt.sign({payload, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, private_key);
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
  },
  getArticle: (req, res) => { // JWT test
    const authHeader = req.headers.authorization;
    if(authHeader !== undefined){
      const token = authHeader.split(' ')[1];
      jwt.verify(token, private_key, (err, decode) => {
        if(err){
          res.json({err: err.toString()})
        }else{
          console.log('jwt:', decode);
          res.json({ok: 1});
        }
      })
    }else{
      res.json({err: 'Auth is empty'});
    }
  }
}

module.exports = userController;