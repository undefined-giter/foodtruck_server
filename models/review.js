const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  pseudo: String,
  email: String,
  //note: mongoose.Types.Decimal128,
  note: {
    type: Number,
    min: 1,
    max: 10
  },
  comment: String,
}, { timestamps: true })

const Review = mongoose.model('reviews', reviewSchema)

module.exports = Review
