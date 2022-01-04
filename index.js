const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.json');
const app = express();
const port = 3000;

//設定 middleware : body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/user', (req, res) => {
  res.json(db.users);
});

app.get('/user/:id', (req, res) => {
  const {id} = req.params;
  const filtered = db.users.filter(user => user.id === +id);
  res.json(filtered);
})

app.get("/product", (req,res) => {
  const products = [
    {
      id: 1,
      name: "hammer",
    },
    {
      id: 2,
      name: "screwdriver",
    },
    {
      id: 3,
      name: "wrench",
    },
  ];

  res.json(products);
})


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})