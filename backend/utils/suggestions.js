// Suggestions system based on waste patterns

const CATEGORY_SUGGESTIONS = {
  Produce: [
    "🌿 Freeze fresh produce before it spoils - many vegetables and fruits freeze well",
    "🥬 Store leafy greens with a paper towel to absorb moisture and extend freshness",
    "📅 Plan meals around produce expiration dates - use items closest to expiry first",
    "🥕 Buy only what you'll use within a few days to prevent spoilage",
    "❄️ Blanch vegetables before freezing to preserve quality and nutrients"
  ],
  Dairy: [
    "🧊 Freeze milk and other dairy products before they expire",
    "📆 Check expiration dates before purchasing - buy items with later dates",
    "🥛 Use dairy products in cooking/baking when nearing expiration",
    "🍶 Store dairy at the back of the fridge (coldest area) for longer freshness",
    "🛒 Buy smaller quantities or split large containers with family/friends"
  ],
  Meat: [
    "❄️ Freeze meat immediately if not using within 2-3 days",
    "🥩 Portion meat before freezing for easier meal planning",
    "📅 Use the 'first in, first out' method - older meat first",
    "🔥 Cook and freeze meals ahead to prevent meat from spoiling",
    "🛒 Buy only what you need for the week to reduce waste"
  ],
  Grains: [
    "🍞 Freeze bread and baked goods to extend their life",
    "📦 Store grains in airtight containers to prevent spoilage",
    "🥖 Make croutons or breadcrumbs from stale bread",
    "📅 Buy smaller quantities of fresh bread if you don't eat it quickly",
    "🍚 Cook grains in smaller batches to match your consumption"
  ],
  Beverages: [
    "🧊 Freeze beverages in ice cube trays for future use",
    "📆 Check expiration dates and prioritize older items",
    "🥤 Buy smaller sizes if you don't finish drinks quickly",
    "🧃 Use near-expiry beverages in smoothies or cooking",
    "📦 Store opened beverages properly sealed in the fridge"
  ],
  Other: [
    "📅 Implement a meal planning system to reduce over-purchasing",
    "🛒 Make a shopping list and stick to it",
    "📊 Track your waste patterns to identify trends",
    "🍽️ Use leftovers creatively in new meals",
    "❄️ Learn proper food storage techniques for different items"
  ]
};

const CAUSE_SUGGESTIONS = {
  'spoiled': [
    "📅 Check expiration dates before purchasing",
    "❄️ Store items at proper temperatures",
    "🥬 Use fresh produce within a few days of purchase",
    "📦 Store items in proper containers to extend freshness"
  ],
  'expired': [
    "📆 Plan meals around expiration dates",
    "🔄 Rotate food using 'first in, first out' method",
    "📅 Set reminders to use items before they expire",
    "🛒 Buy smaller quantities to reduce expired items"
  ],
  'over-purchased': [
    "📝 Create a shopping list and stick to it",
    "🍽️ Plan meals for the week before shopping",
    "🛒 Avoid shopping when hungry to prevent impulse buys",
    "📊 Track your actual consumption to buy realistic amounts"
  ],
  'leftovers': [
    "🍱 Plan to use leftovers within 3-4 days",
    "❄️ Freeze leftovers for future meals",
    "🍽️ Get creative - turn leftovers into new dishes",
    "📅 Schedule leftover days in your meal plan"
  ],
  'damaged': [
    "🛒 Inspect items carefully before purchasing",
    "📦 Handle food carefully during transport",
    "🗑️ Use damaged items immediately if still safe",
    "💼 Use proper bags/containers when shopping"
  ],
  'other': [
    "📊 Track your waste patterns to identify issues",
    "📚 Learn about food storage best practices",
    "🍽️ Adjust portion sizes to match your appetite",
    "🔄 Review and adjust your shopping habits regularly"
  ]
};

/**
 * Get suggestions based on waste statistics
 */
function getSuggestions(stats) {
  const suggestions = [];

  if (!stats || stats.totalItems === 0) {
    return [{
      type: 'general',
      title: "🎉 Great job!",
      tips: ["You haven't logged any food waste yet. Keep tracking to see your impact!"]
    }];
  }

  // Find most wasted category
  const categoryEntries = Object.entries(stats.byCategory || {});
  const topCategory = categoryEntries
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])[0];

  if (topCategory && CATEGORY_SUGGESTIONS[topCategory[0]]) {
    const categorySuggestions = CATEGORY_SUGGESTIONS[topCategory[0]];
    suggestions.push({
      type: 'category',
      title: `You waste ${topCategory[0]} most frequently`,
      tips: categorySuggestions.slice(0, 3) // Top 3 suggestions
    });
  }

  // Find most common cause
  const causeEntries = Object.entries(stats.byCause || {});
  const topCause = causeEntries
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])[0];

  if (topCause && CAUSE_SUGGESTIONS[topCause[0]]) {
    const causeSuggestions = CAUSE_SUGGESTIONS[topCause[0]];
    suggestions.push({
      type: 'cause',
      title: `Your main cause of waste: ${topCause[0].charAt(0).toUpperCase() + topCause[0].slice(1)}`,
      tips: causeSuggestions.slice(0, 3) // Top 3 suggestions
    });
  }

  return suggestions;
}

module.exports = {
  getSuggestions
};
