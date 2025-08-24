const express = require('express');
const Plant = require('../models/Plant');

const router = express.Router();

// GET all plants with search and filter
router.get('/plants', async (req, res) => {
  try {
    const { name, category } = req.query;
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }

    if (category) {
      query.categories = { $regex: category, $options: 'i' }; // Case-insensitive search
    }

    const plants = await Plant.find(query);
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all unique categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Plant.distinct('categories');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new plant (Admin Feature)
router.post('/plants', async (req, res) => {
  const { name, price, categories, stockAvailability } = req.body;

  // Basic validation
  if (!name || !price || !categories) {
    return res.status(400).json({ message: 'Please enter all required fields: name, price, categories' });
  }

  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({ message: 'Price must be a non-negative number' });
  }

  if (!Array.isArray(categories) || categories.some(cat => typeof cat !== 'string')) {
    return res.status(400).json({ message: 'Categories must be an array of strings' });
  }

  const newPlant = new Plant({
    name,
    price,
    categories,
    stockAvailability: stockAvailability !== undefined ? stockAvailability : true, // Default to true if not provided
  });

  try {
    const savedPlant = await newPlant.save();
    res.status(201).json(savedPlant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update an existing plant by ID (Admin Feature)
router.put('/plants/:id', async (req, res) => {
  const { name, price, categories, stockAvailability, imageUrl } = req.body;

  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    if (name) plant.name = name;
    if (price !== undefined) {
      if (typeof price !== 'number' || price < 0) {
        return res.status(400).json({ message: 'Price must be a non-negative number' });
      }
      plant.price = price;
    }
    if (categories) {
      if (!Array.isArray(categories) || categories.some(cat => typeof cat !== 'string')) {
        return res.status(400).json({ message: 'Categories must be an array of strings' });
      }
      plant.categories = categories;
    }
    if (stockAvailability !== undefined) plant.stockAvailability = stockAvailability;
    if (imageUrl) plant.imageUrl = imageUrl;

    const updatedPlant = await plant.save();
    res.json(updatedPlant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a plant by ID (Admin Feature)
router.delete('/plants/:id', async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.json({ message: 'Plant deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;