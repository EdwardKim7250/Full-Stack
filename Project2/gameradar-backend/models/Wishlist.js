const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
  {
    gameId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    released: { type: String, default: 'TBA' },
    background_image: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wishlist', wishlistSchema);
