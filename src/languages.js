const { wordlists }  = require("bip39");

/**
 * Canonical BIP-39 language keys as used by bip39.wordlists
 * (we keep this only for docs and safety)
 * @typedef {(
 *  "english" |
 *  "spanish" |
 *  "french" |
 *  "italian" |
 *  "japanese" |
 *  "korean" |
 *  "chinese_simplified" |
 *  "chinese_traditional"
 * )} CanonicalLanguage
 */

/**
 * Aliases for each language.
 * These can be used for CLI flags or API usage.
 */
const LANGUAGE_ALIASES = {
  english: ["en", "eng", "english"],
  spanish: ["es", "sp", "spanish"],
  french: ["fr", "french"],
  italian: ["it", "italian"],
  japanese: ["jp", "ja", "japanese"],
  korean: ["kr", "ko", "korean"],
  chinese_simplified: ["cn", "zh-cn", "chinese", "chinese_simplified"],
  chinese_traditional: ["tw", "zh-tw", "chinese_traditional"]
};

/**
 * @typedef {Object} ResolvedLanguage
 * @property {CanonicalLanguage} key - Canonical BIP-39 key
 * @property {readonly string[]} wordlist - BIP-39 wordlist for that language
 */

/**
 * Resolve a language identifier to a canonical BIP-39 language + wordlist.
 *
 * @param {string | undefined | null} lang
 * @returns {ResolvedLanguage}
 */
function resolveLanguage(lang) {
  if (!lang) {
    return {
      key: /** @type {CanonicalLanguage} */ ("english"),
      wordlist: wordlists.english
    };
  }

  const needle = String(lang).toLowerCase().trim();
  
  
  
  // 1) direct canonical match
  if (Object.prototype.hasOwnProperty.call(wordlists, needle)) {
    return {
      key: /** @type {CanonicalLanguage} */ (needle),
      wordlist: wordlists[needle]
    };
  }

  // 2) alias match
  for (const [canonical, aliases] of Object.entries(LANGUAGE_ALIASES)) {
    if (
      aliases.some((alias) => alias.toLowerCase() === needle) ||
      canonical.toLowerCase() === needle
    ) {
      const wl = wordlists[canonical];
      if (!wl) {
        throw new Error(`Wordlist not available for language: ${canonical}`);
      }
      return {
        key: /** @type {CanonicalLanguage} */ (canonical),
        wordlist: wl
      };
    }
  }

  throw new Error(
    `Unsupported language "${lang}". Supported: english, spanish, french, italian, japanese, korean, chinese_simplified, chinese_traditional`
  );
}

module.exports = {
  LANGUAGE_ALIASES,
  resolveLanguage
};
