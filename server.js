const express     = require('express');
const app         = express();
const mongoose    = require('mongoose');
const request     = require('request');
const Latest      = require('./latest.model.js');
const onlyOne     = require('./logic.js').onlyOne;
const parseData   = require('./logic.js').parseData;
const apiURL      = 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=';
const mongoURI    = process.env.MONGODB_URI || 'mongodb://localhost/image-search-api';

mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;

app.get('/', (req, res) => {
  res.json({"status": 200, "message": "Welcome to the image search API."})
});

app.get('/api/imagesearch/:term', (req, res) => {
  let term = req.params.term;
  let offset = req.query.offset;
  let url = `${apiURL}${term}&count=10`;
  console.log(url);

  if(offset) url += `&offset=${offset}`;
  console.log(url);

  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Ocp-Apim-Subscription-Key': '0ce18ef270034c8eaf62955327421ef9'
    }
  }

  request(options, (err, response, body) => {
    if(err)console.log(err);
    res.json(parseData(JSON.parse(body).value))
  });
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
