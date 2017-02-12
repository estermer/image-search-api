const express     = require('express');
const app         = express();
const mongoose    = require('mongoose');

app.get('/', (req, res) => {
  res.json({"status": 200, "message": "Welcome to the image search API."})
});

app.listen(process.env.PORT || 3000);
