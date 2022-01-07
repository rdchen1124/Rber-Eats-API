const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const app = express();
const port = 3000;
const Store = db.Store;
const Meal = db.Meal;

//設定 middleware : body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/store', (req, res) => {
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
})

app.get('/store/:id', (req, res) => {
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
  
});

app.post('/store', (req, res) => {
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
})

app.get('/meal', (req, res) => {
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
})

app.get('/meal/:id', (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})