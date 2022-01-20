const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;
const private_key = 'secret';
const userController = {
  postAuthUser: (req, res) => {
    const {username, password} = req.body;
    User.findOne({
      where: {
        username
      }
    }).then(user => {
      if(!user){
        res.json({err: `${username} is not defined.`});
      }else{
        bcrypt.compare(password, user.password
        ).then(result => {
          if(result){
            const payload = {
              user_id: user.id,
              user_name: user.username
            };
            const token = jwt.sign({payload, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)}, private_key);
            res.json({ok: 1, token, user: {
              id: user.id,
              username: user.username,
              favorites: user.favorites
            }});
          }else{
            res.json({err: 'password is incorrect.'});
          }
        })
      }
    }).catch(err => {
      res.json({err: err.toString()});
    })
  },
  postNewUser: (req, res) => {
    const user = {
      username: req.body.username,
      password: req.body.password,
      favorites: req.body.favorites
    };
    bcrypt.hash(user.password, saltRounds
    ).then(hash => {
      User.create({
        username: user.username,
        password: hash,
        favorites: user.favorites
      }).then((user) => {
        const payload = {
          user_id: user.id,
          user_name: user.username
        };
        const token = jwt.sign({payload, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)}, private_key);
        res.json({ok: 1, token, user: {
          id: user.id,
          username: user.username,
          favorites: user.favorites
        }});
      }).catch(err => {
        res.json({err: err.toString()});
      })
    }).catch(err => {
      res.json({err: err.toString()});
    });
  },
  patchUserFavorites: (req, res) => {
    const {favorites} = req.body;
    const id = +req.params.id;
    User.update({
      favorites
    },{
      where: {
        id
      }
    }).then((data)=>{
      console.log('res:', JSON.stringify(data));
      res.json({ok: 1});
    }).catch(err => {
      res.json({err: err.toString()});
    });
  }
}

module.exports = userController;