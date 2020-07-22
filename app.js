const express = require('express');

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.json({message: 'Bienvenue sur Express'} );
  });
  
module.exports = app; 