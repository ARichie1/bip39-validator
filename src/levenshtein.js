/**
 * Simple Levenshtein distance implementation.
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const dp = new Array(b.length + 1);

  for (let j = 0; j <= b.length; j++) {
    dp[j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    let prev = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      if (a[i - 1] === b[j - 1]) {
        dp[j] = prev;
      } else {
        dp[j] = Math.min(prev + 1, dp[j] + 1, dp[j - 1] + 1);
      }
      prev = tmp;
    }
    dp[0] = i;
  }

  return dp[b.length];
}

/**
 * Suggest words from a dictionary based on Levenshtein distance.
 *
 * @param {string} input
 * @param {readonly string[]} dictionary
 * @param {number} [maxSuggestions]
 * @param {number} [maxDistance]
 * @returns {string[]}
 */
function suggestFromDictionary(input, dictionary, maxSuggestions = 3, maxDistance = 2) {
  const clean = input.trim().toLowerCase();
  if (!clean) return [];

  const scored = [];

  for (const word of dictionary) {
    const w = String(word);
    const distance = levenshtein(clean, w.toLowerCase());
    if (distance <= maxDistance) {
      scored.push({ word: w, distance });
    }
  }

  scored.sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    return a.word.localeCompare(b.word);
  });

  return scored.slice(0, maxSuggestions).map((s) => s.word);
}

module.exports = {
  levenshtein,
  suggestFromDictionary
};
