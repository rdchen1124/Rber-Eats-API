const db = require('../models');
const Store = db.Store;
const storeController = {
  getAllStore: (req, res) => {
    let searchOption = {
      order: [
        ['id', 'ASC']
      ]
    };
    if(req.query._limit){
      const limit = +req.query._limit;
      searchOption.limit = limit;
    }
    if(req.query._offset){
      const offset = +req.query._offset;
      searchOption.offset = offset;
    }
    Store.findAll(searchOption).then(data =>{
      res.json(data);
    }).catch(err => {
      res.json({
        error: err.toString()
      })
    });
  },
  getOneStore: (req, res) => {
    const {id} = req.params;
    Store.findOne({
      where: {
        id: +id
      }
    }).then(store => {
      res.json(store);
    }).catch(err => {
      res.json({
        error: err.toString()
      })
    });
  },
  postNewStore: (req, res) => {
    const {name, type, image, score} = req.body;
    Store.create({
      name,
      type,
      image,
      score
    }).then(()=>{
      res.json({
        ok: 1
      })
    })
  }
}

module.exports = storeController;