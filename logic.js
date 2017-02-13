const Latest = require('./latest.model.js');

module.exports = {
  onlyTen() {
    Latest.find({})
      .then((searches) => {
        if(searches.length == 11){
          Latest.findOneAndRemove({'_id': searches[0]._id})
            .catch((err) => {
              if (err)console.log(err);
            });
        }
      });
  },
  parseData(array) {
    return array.map((e) => {
      return {
        "url": e.hostPageDisplayUrl,
        'snippet': e.name,
        'thumbnail': e.thumbnailUrl
      }
    })
  }
}
