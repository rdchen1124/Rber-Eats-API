 // require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const storeController = require('./controllers/store');
const mealController = require('./controllers/meal');
const userController = require('./controllers/user');
const orderRouter = require('./routes/order');
const app = express();
const port = process.env.PORT;

//設定 middleware : body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/store', storeController.getAllStore);

app.get('/store/:id', storeController.getOneStore);

app.post('/store', storeController.postNewStore);

app.get('/meal', mealController.getAllMeal);

app.get('/meal/:id', mealController.getOneMeal);

app.get('/user', userController.getAuthUser);

app.post('/user', userController.postNewUser);

app.use('/order', orderRouter);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})