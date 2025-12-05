const bip39 = require("bip39");
const { resolveLanguage } = require("./languages");
const { suggestFromDictionary } = require("./levenshtein");
const { detectLanguage } = require("./languageDetector");

/**
 * @typedef {(
 *  "invalid_words" |
 *  "invalid_length" |
 *  "unknown_words" |
 *  "invalid_checksum" |
 *  ""
 * )} ValidationError
 */

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} valid
 * @property {string} language
 * @property {ValidationError} [error]
 * @property {string[]} [validWords]
 * @property {string[]} [invalidWords]
 * @property {Record<string, string[]>} [suggestions]

 */

/**
 * Split a mnemonic phrase into words.
 * Handles multiple spaces and unicode.
 *
 * @param {string} mnemonic
 * @returns {string[]}
 */
function splitMnemonic(mnemonic) {
  return mnemonic
    .trim()
    .split(/\s+/u)
    .filter(Boolean);
}

/**
 * Check if a single word is valid for a given language.
 *
 * @param {string} word
 * @param {string} [language]
 * @returns {boolean}
 */
function isValidWord(word, language) {
  const { wordlist } = resolveLanguage(language);
  const target = word.trim();
  if (!target) return false;
  return wordlist.includes(target);
}

/**
 * Validate an array of words.
 *
 * @param {string[]} words
 * @param {string} [language]
 * @returns {ValidationResult} 
 */
function validateWords(words, language) {
  const { key, wordlist } = resolveLanguage(language);
  
  let valid = false;
  let error = ""
  let validWords = [];
  let invalidWords = [];
  let suggestions = {};
  
  if (words.length === 0) {
    return {
      valid, 
      language : key,
      error: "invalid_length",
      validWords: [],
      invalidWords: [],
      suggestions: {},
    };
  }

  // Run language detection for multi-language suggestions
  // returns topLanguage + wordMatches
  const detected = detectLanguage(words.join(" ")); 

  for (const raw of words) {
    const w = raw.trim();
    if (!w) continue;
    if (wordlist.includes(w)) {
      validWords.push(w);
    } else {
      invalidWords.push(w);

      // holds suggestions for invalid words
      suggestions[w] = {words: [], alternativeLanguages: []}

      // get the wordinfo from the array the language detector created
      const wordInfo = detected.wordMatches[w] || {};
      
      // add the current word suggestions
      suggestions[w]["words"] = wordInfo.suggestions || [];

      // optional: attach alternativeLanguages if exists
      if (wordInfo.otherLanguages && wordInfo.otherLanguages.length > 0) {
        suggestions[w]["alternativeLanguages"]
          .push(wordInfo.otherLanguages.filter((l) => l !== key)
        )
      }
    }
  }

  if (invalidWords.length > 0) {
    valid = false
    error = "invalid_words"
  }

  return { 
    valid: true, 
    language: key,
    error,
    validWords, invalidWords, 
    suggestions 
  };
}

/**
 * Validate a full BIP-39 mnemonic with checksum.
 *
 * Security notes:
 * - No logging of mnemonic
 * - No network calls
 *
 * @param {string} mnemonic
 * @param {string} [language]
 * @returns {ValidationResult}
 */
function isValidMnemonic(mnemonic, language) {
  const { key, wordlist } = resolveLanguage(language);
  const words = splitMnemonic(mnemonic);

  if (words.length === 0) {
    return {
      valid: false,
      language: key,
      error: "invalid_length",
      validWords: [],
      invalidWords: [],
      suggestions: {},
    };
  }

  // BIP-39 supports 12, 15, 18, 21, 24 words
  const allowedLengths = [12, 15, 18, 21, 24];
  const validLength = allowedLengths.includes(words.length);

  const { validWords, invalidWords, suggestions } = validateWords(words, key);
  
  if (invalidWords.length > 0) {
    return {
      valid: false,
      language: key,
      error: "unknown_words",
      validWords,
      invalidWords,
      suggestions,
    };
  }

  if (!validLength) {
    return {
      valid: false,
      language: key,
      error: "invalid_length",
      validWords,
      invalidWords,
      suggestions: {},
    };
  }

  // Now verify checksum using bip39
  const bipValid = bip39.validateMnemonic(mnemonic, wordlist);

  if (!bipValid) {
    return {
      valid: false,
      language: key,
      error: "invalid_checksum",
      validWords: [],
      invalidWords: [],
      suggestions: {},
    };
  }

  return {
    valid: true,
    language: key,
    error: "",
    validWords,
    invalidWords,
    suggestions: {},
  };
}

/**
 * Suggest valid BIP-39 words given a partial/typo word.
 *
 * @param {string} input
 * @param {string} [language]
 * @param {number} [maxSuggestions]
 * @returns {string[]}
 */
function suggestWord(input, language, maxSuggestions = 3) {
  const { wordlist } = resolveLanguage(language);

  const detected = detectLanguage(input);
  let suggestion = [];

  if (detected?.topLanguage) {
    suggestion = detected.wordMatches[input]?.suggestions || [];
  }

  if (!suggestion.length) {
    suggestion = suggestFromDictionary(input, wordlist, maxSuggestions, 2);
  }

  return suggestion;
}
 
module.exports = {
  isValidWord,
  validateWords,
  isValidMnemonic,
  suggestWord,
  detectLanguage
};
