const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConsumptionSchema = new Schema({
  car: {
    type: String, 
    required: true
  },
  mileage: {
    type: Number,
    required: true
  },
  trip: {
    type: Number,
    required: true
  },
  fuelUsed: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = Consumption = mongoose.model('consumptions', ConsumptionSchema);