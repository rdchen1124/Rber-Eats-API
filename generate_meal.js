const db = require('./models');
const Meal = db.Meal;
const meals = require('./db.json').meals;

meals.forEach((meal) => {
  console.log(meal.name);
  Meal.create({
    name: meal.name,
    img: meal.img,
    price: meal.price,
    description: meal.description,
    StoreId: +meal.store_id[meal.store_id.length-1]
  }).then(()=>{
    console.log(meal.name, 'is uploading!!');
  })
})