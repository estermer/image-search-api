const Latest = require('./latest.model.js');

module.exports = {
  onlyTen() {
    Latest.find({})
      .then((searches) => {
        if(searchs.length == 10){
          Latest.findOneAndRemove({'_id': searches[0]._id})
            .catch((err) => {
              if (err)console.log(err);
            })
        }
      });
  }
}
