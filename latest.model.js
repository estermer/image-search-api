const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

const LatestSchema = new Schema({
  term: String,
  when: Date
});

const LatestModel = mongoose.model('Latest', LatestSchema);

module.exports = LatestModel;
