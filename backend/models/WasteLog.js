const mongoose = require('mongoose');

const wasteLogSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  category: {
    type: String,
    required: true,
    enum: ['Produce', 'Dairy', 'Meat', 'Grains', 'Beverages', 'Other'],
    trim: true
  },
  item: {
    type: String,
    required: true,
    trim: true
  },
  weightKg: {
    type: Number,
    required: true,
    min: 0
  },
  carbonKg: {
    type: Number,
    required: true,
    min: 0
  },
  moneyLost: {
    type: Number,
    required: true,
    min: 0
  },
  cause: {
    type: String,
    required: true,
    enum: ['spoiled', 'expired', 'over-purchased', 'leftovers', 'damaged', 'other'],
    lowercase: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('waste_entries', wasteLogSchema);
