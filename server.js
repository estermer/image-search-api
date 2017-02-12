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

app.listen(process.env.PORT || 3000);
