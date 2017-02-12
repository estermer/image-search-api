const express     = require('express');
const app         = express();
const mongoose    = require('mongoose');
const request     = require('request');
const bodyParser  = require('body-parser');
const Latest      = require('./latest.model.js');
const onlyOne     = require('./logic.js').onlyOne;
const parseData     = require('./logic.js').parseData;
const apiURL      = 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/image-search-api';
mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;

app.get('/', (req, res) => {
  res.json({"status": 200, "message": "Welcome to the image search API."})
});

app.get('/api/imagesearch/:term', (req, res) => {
  let term = req.params.term;
  // let offset = req.body;
  // console.log(offset);

  let options = {
    url: `${apiURL}${term}&count=10`,
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
