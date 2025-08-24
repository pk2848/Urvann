const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  categories: {
    type: [String],
    default: [],
  },
  stockAvailability: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
        type: String
    },
});

module.exports = mongoose.model('Plant', PlantSchema);