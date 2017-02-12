const express     = require('express');
const app         = express();
const mongoose    = require('mongoose');
const Latest      = require('./latest.model.js');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/image-search-api';
mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;

app.get('/', (req, res) => {
  res.json({"status": 200, "message": "Welcome to the image search API."})
});

app.get('/api/imagesearch/:term', (req, res) => {
  let term = req.params.term;
});

app.get('/api/latest/imagesearch', (req, res) => {
  Latest.find({})
    .then((searches) => {
      searches.reverse();
      res.json(searches);
    })
    .catch((err) => {
      if(err)console.log(err);
    });
});

app.listen(process.env.PORT || 3000);
