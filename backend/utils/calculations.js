// Food waste calculation constants and functions

// Carbon emission factor: ~2.5 kg CO₂ per kg of food waste
// (accounts for production, transportation, and decomposition)
const CARBON_FACTOR = 2.5;

// Average price per kg for different food categories (USD)
const PRICE_PER_KG = {
  Produce: 3.0,      // Fruits and vegetables
  Dairy: 5.0,        // Dairy products
  Meat: 12.0,        // Meat products
  Grains: 2.0,       // Bread, pasta, rice
  Beverages: 4.0,    // Drinks and beverages
  Other: 3.5         // Default for other categories
};

/**
 * Calculate carbon emissions for food waste
 * Based on weight in kg
 */
function calculateCarbon(weightKg) {
  return parseFloat((weightKg * CARBON_FACTOR).toFixed(4));
}

/**
 * Calculate money lost based on food category and weight
 */
function calculateMoneyLost(category, weightKg) {
  const pricePerKg = PRICE_PER_KG[category] || PRICE_PER_KG.Other;
  return parseFloat((weightKg * pricePerKg).toFixed(2));
}

/**
 * Calculate all impact metrics for a food waste item
 */
function calculateImpact(category, weightKg) {
  return {
    carbonKg: calculateCarbon(weightKg),
    moneyLost: calculateMoneyLost(category, weightKg)
  };
}

module.exports = {
  calculateImpact,
  calculateCarbon,
  calculateMoneyLost
};
