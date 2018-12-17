const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  licensePlate: {
    type: String,
  },
  engine: {
    type: Number,
  },
  owner: {
    type: String,
    required: true
  },
  currentMileage: {
    type: Number,
    required: true
  }
});

module.exports = Car = mongoose.model('cars', CarSchema);