// src/index.js

const bip39 = require("bip39");
const { resolveLanguage } = require("./languages");
const { suggestFromDictionary } = require("./levenshtein");

/**
 * @typedef {(
 *  "invalid_length" |
 *  "unknown_words" |
 *  "invalid_checksum"
 * )} ValidationErrorReason
 */

/**
 * @typedef {Object} MnemonicValidationResult
 * @property {boolean} valid
 * @property {ValidationErrorReason | undefined} [reason]
 * @property {string[]} [invalidWords]
 * @property {Record<string, string[]>} [suggestions]
 * @property {string} language
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
 * @returns {{ valid: string[]; invalid: string[]; suggestions: Record<string, string[]> }}
 */
function validateWords(words, language) {
  const { wordlist } = resolveLanguage(language);
  console.log(wordlist.includes("potato"));
  
  const valid = [];
  const invalid = [];
  const suggestions = {};

  for (const raw of words) {
    const w = raw.trim();
    if (!w) continue;
    if (wordlist.includes(w)) {
      valid.push(w);
    } else {
      invalid.push(w);
      suggestions[w] = suggestFromDictionary(w, wordlist);
    }
  }

  return { valid, invalid, suggestions };
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
 * @returns {MnemonicValidationResult}
 */
function isValidMnemonic(mnemonic, language) {
  const { key, wordlist } = resolveLanguage(language);
  const words = splitMnemonic(mnemonic);

  if (words.length === 0) {
    return {
      valid: false,
      reason: "invalid_length",
      invalidWords: [],
      suggestions: {},
      language: key
    };
  }

  // BIP-39 supports 12, 15, 18, 21, 24 words
  console.log(words);
  
  const allowedLengths = [12, 15, 18, 21, 24];
  const validLength = allowedLengths.includes(words.length);

  const { invalid, suggestions } = validateWords(words, key);
  
  if (invalid.length > 0) {
    return {
      valid: false,
      reason: "unknown_words",
      invalidWords: invalid,
      suggestions,
      language: key
    };
  }

  if (!validLength) {
    return {
      valid: false,
      reason: "invalid_length",
      invalidWords: [],
      suggestions: {},
      language: key
    };
  }

  // Now verify checksum using bip39
  const bipValid = bip39.validateMnemonic(mnemonic, wordlist);

  if (!bipValid) {
    return {
      valid: false,
      reason: "invalid_checksum",
      invalidWords: [],
      suggestions: {},
      language: key
    };
  }

  return {
    valid: true,
    reason: undefined,
    invalidWords: [],
    suggestions: {},
    language: key
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
  return suggestFromDictionary(input, wordlist, maxSuggestions, 2);
}

module.exports = {
  isValidWord,
  validateWords,
  isValidMnemonic,
  suggestWord
};
