const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// GET /api/wishlist - fetch all saved games
router.get('/', async (req, res) => {
  try {
    const games = await Wishlist.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

// POST /api/wishlist - add a game
router.post('/', async (req, res) => {
  const { gameId, name, released, background_image } = req.body;

  if (!gameId || !name) {
    return res.status(400).json({ error: 'gameId and name are required' });
  }

  try {
    const existing = await Wishlist.findOne({ gameId });
    if (existing) {
      return res.status(409).json({ error: 'Game already in wishlist' });
    }

    const game = await Wishlist.create({ gameId, name, released, background_image });
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add game to wishlist' });
  }
});

// DELETE /api/wishlist/:id - remove a game
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Wishlist.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Game not found in wishlist' });
    }
    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove game' });
  }
});

module.exports = router;
