// Scoring system for food waste tracking
// Lower waste = Higher score (out of 100)

/**
 * Calculate overall waste score based on various metrics
 * Score ranges from 0-100, where 100 is perfect (no waste)
 */
function calculateScore(stats, totalDays = 30) {
  if (!stats || stats.totalItems === 0) {
    return 100; // Perfect score if no waste
  }

  // Calculate daily averages
  const dailyWeightKg = stats.totalWeightKg / totalDays;
  const dailyCarbonKg = stats.totalCarbonKg / totalDays;
  const dailyMoneyLost = stats.totalMoneyLost / totalDays;

  // Baseline thresholds (moderate waste levels)
  // These can be adjusted based on typical household waste
  const WEIGHT_THRESHOLD = 0.5; // kg per day (moderate)
  const CARBON_THRESHOLD = 1.25; // kg CO₂ per day (moderate)
  const MONEY_THRESHOLD = 1.5; // USD per day (moderate)

  // Calculate scores for each metric (0-100 scale)
  const weightScore = Math.max(0, 100 - (dailyWeightKg / WEIGHT_THRESHOLD) * 50);
  const carbonScore = Math.max(0, 100 - (dailyCarbonKg / CARBON_THRESHOLD) * 50);
  const moneyScore = Math.max(0, 100 - (dailyMoneyLost / MONEY_THRESHOLD) * 50);

  // Weighted average (money is most impactful for users)
  const overallScore = (weightScore * 0.3 + carbonScore * 0.3 + moneyScore * 0.4);
  
  return Math.round(Math.min(100, Math.max(0, overallScore)));
}

/**
 * Get score grade and description
 */
function getScoreGrade(score) {
  if (score >= 90) return { grade: 'A+', label: 'Excellent', color: '#10b981' };
  if (score >= 80) return { grade: 'A', label: 'Great', color: '#22c55e' };
  if (score >= 70) return { grade: 'B', label: 'Good', color: '#84cc16' };
  if (score >= 60) return { grade: 'C', label: 'Fair', color: '#eab308' };
  if (score >= 50) return { grade: 'D', label: 'Needs Improvement', color: '#f59e0b' };
  return { grade: 'F', label: 'Poor', color: '#ef4444' };
}

module.exports = {
  calculateScore,
  getScoreGrade
};
