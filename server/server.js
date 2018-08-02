const path = require('path');
const express = require('express');

const routes = require('../routes/index');

const viewsPath = path.join(__dirname,'../views');
const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000;

var app = express();

app.set('views',viewsPath);
app.set('view engine','pug');

app.use(express.static(publicPath));

app.use('/',routes);

app.listen(port,(err) => {
  if(err)
    console.log(`Unable to listen to port ${3000}`);
  else
    console.log(`Server is listening to the port ${3000}`);
})
