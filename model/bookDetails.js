const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: false,
  },
  publisher: {
    type: String,
    require: false,
  },
  genre: {
    type: String,
    require: false,
  },
  demographic: {
    type: String,
    require: false,
  },
  image: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});
bookSchema.index({ '$**': 'text' });
const bookDetails = mongoose.model('BookDetails', bookSchema);
module.exports = bookDetails;
