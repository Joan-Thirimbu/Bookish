const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genres: [{ type: String, required: true }],
  price: { type: Number, required: true },
  description: { type: String, required: true },
  publisher: { type: String },
  publicationDate: { type: Date },
  isbn: { type: String, unique: true, required: true },
  coverImage: { type: String }, // URL to book cover image
  language: { type: String, default: "English" },
  pages: { type: Number },
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      reviewText: String,
      rating: Number,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Book', bookSchema);