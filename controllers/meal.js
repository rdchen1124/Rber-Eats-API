const db = require('../models');
const Meal = db.Meal;
const mealController = {
  getAllMeal: (req, res) => {
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
    if(req.query.store_id){
      searchOption.where = {
        StoreId: +req.query.store_id
      }
    }
    Meal.findAll(searchOption
    ).then(data => {
      res.json(data);
    }).catch(err => {
      res.json({
        error: err.toString()
      })
    });
  },
  getOneMeal: (req, res) => {
    const {id} = req.params;
    Meal.findOne({
      where: {
        id
      }
    }).then(meal => {
      res.json(meal);
    }).catch(err => {
      res.json({
        error: err.toString()
      })
    });
  }
}

module.exports = mealController;