const express = require('express');
const router = express.Router();
const WasteLog = require('../models/WasteLog');
const { calculateImpact } = require('../utils/calculations');
const { calculateScore, getScoreGrade } = require('../utils/scoreSystem');
const { getSuggestions } = require('../utils/suggestions');

// GET all waste logs
router.get('/', async (req, res) => {
  try {
    const logs = await WasteLog.find().sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET waste logs by date range
router.get('/stats', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    const logs = await WasteLog.find(query);
    
    // Calculate aggregated stats for food waste
    const stats = {
      totalItems: logs.length,
      totalWeightKg: logs.reduce((sum, log) => sum + (log.weightKg || 0), 0),
      totalCarbonKg: logs.reduce((sum, log) => sum + (log.carbonKg || 0), 0),
      totalMoneyLost: logs.reduce((sum, log) => sum + (log.moneyLost || 0), 0),
      byCategory: {
        Produce: logs.filter(l => l.category === 'Produce').length,
        Dairy: logs.filter(l => l.category === 'Dairy').length,
        Meat: logs.filter(l => l.category === 'Meat').length,
        Grains: logs.filter(l => l.category === 'Grains').length,
        Beverages: logs.filter(l => l.category === 'Beverages').length,
        Other: logs.filter(l => l.category === 'Other').length
      },
      byCause: {
        spoiled: logs.filter(l => l.cause === 'spoiled').length,
        expired: logs.filter(l => l.cause === 'expired').length,
        'over-purchased': logs.filter(l => l.cause === 'over-purchased').length,
        leftovers: logs.filter(l => l.cause === 'leftovers').length,
        damaged: logs.filter(l => l.cause === 'damaged').length,
        other: logs.filter(l => l.cause === 'other').length
      },
      dailyBreakdown: {}
    };
    
    // Group by date
    logs.forEach(log => {
      const dateKey = log.date.toISOString().split('T')[0];
      if (!stats.dailyBreakdown[dateKey]) {
        stats.dailyBreakdown[dateKey] = {
          date: dateKey,
          count: 0,
          weightKg: 0,
          carbonKg: 0,
          moneyLost: 0
        };
      }
      stats.dailyBreakdown[dateKey].count += 1;
      stats.dailyBreakdown[dateKey].weightKg += (log.weightKg || 0);
      stats.dailyBreakdown[dateKey].carbonKg += (log.carbonKg || 0);
      stats.dailyBreakdown[dateKey].moneyLost += (log.moneyLost || 0);
    });
    
    stats.dailyBreakdown = Object.values(stats.dailyBreakdown);
    
    // Calculate number of days covered
    let totalDays = 30; // Default to 30 days
    if (logs.length > 0) {
      const dates = logs.map(log => new Date(log.date).getTime());
      const minDate = Math.min(...dates);
      const maxDate = Math.max(...dates);
      const daysDiff = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
      totalDays = Math.max(daysDiff, 1); // At least 1 day
    }
    
    // Calculate score and grade
    const score = calculateScore(stats, totalDays);
    const scoreGrade = getScoreGrade(score);
    stats.score = score;
    stats.scoreGrade = scoreGrade;
    
    // Get personalized suggestions
    stats.suggestions = getSuggestions(stats);
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new waste log
router.post('/', async (req, res) => {
  try {
    const { item, category, weightKg, cause, date } = req.body;
    
    // Calculate impact (carbonKg and moneyLost)
    const impact = calculateImpact(category, weightKg);
    
    const wasteLog = new WasteLog({
      item,
      category,
      weightKg,
      cause: cause || 'other',
      date: date ? new Date(date) : new Date(),
      ...impact
    });
    
    const savedLog = await wasteLog.save();
    res.status(201).json(savedLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE waste log
router.delete('/:id', async (req, res) => {
  try {
    const deletedLog = await WasteLog.findByIdAndDelete(req.params.id);
    if (!deletedLog) {
      return res.status(404).json({ error: 'Waste log not found' });
    }
    res.json({ message: 'Waste log deleted successfully', deletedLog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
