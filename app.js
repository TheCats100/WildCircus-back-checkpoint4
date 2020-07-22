require('dotenv').config();

const express = require('express');

const app = express();
const cors = require('cors')
const indexRouter = require('./routes');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));


app.use('/', indexRouter);


app.get('/', (request, response) => {
    response.json({message: 'Bienvenue sur Express'} );
  });
  
module.exports = app; 