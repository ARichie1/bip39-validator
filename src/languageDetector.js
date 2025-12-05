const { wordlists }  = require("bip39");
const { suggestFromDictionary } = require("./levenshtein");

/**
 * @typedef {keyof typeof wordlists} Language
 * Available BIP-39 languages
 */

/**
 * @typedef {Object} WordMatch
 * @property {boolean} valid - True if word exists in any wordlist
 * @property {string[]} suggestions - Suggested corrections in top language
 * @property {string[]} otherLanguages - Other languages this word exists in
 */

/**
 * @typedef {Object} DetectLanguageResult
 * @property {Language | undefined} topLanguage - The most likely language of the input
 * @property {Record<string, WordMatch>} wordMatches - Word-level information and suggestions
 */

const { english, spanish, french, italian, japanese,
    korean, chinese_simplified, chinese_traditional } = wordlists;

/** @type {Record<Language, string[]>} */
const languageWordlists = {
    english, spanish, french, italian, japanese,
    korean, chinese_simplified, chinese_traditional
};

/**
 * Detect the language of an input string and provide suggestions for invalid words.
 *
 * @param {string} input - The input string/mnemonic to analyze.
 * @returns {DetectLanguageResult | undefined} Language detection result and suggestions for each invalid input.
 */
function detectLanguage(input) {
    // Split input into normalized words
    const words = input.trim().toLowerCase().split(/\s+/);

    // Initialize ranking per language
    /** @type {Record<Language, number>} */
    const languageRanking = {}
    for (const lang of Object.keys(languageWordlists)) {
        languageRanking[lang] = 0;
    }

    // This will contain the languages an invalid word matches
     /** @type {Record<string, WordMatch>} */
    const wordMatches = {};

    // Score each word across all languages
    for (const word of words) {
        const matches = [];

        for (const [lang, wordlist] of Object.entries(languageWordlists)) {
            if (wordlist.includes(word)) {
                languageRanking[lang] += 1;
                matches.push(lang);
            }
        }

        // Store word info
         wordMatches[word] = {
            valid: matches.length > 0,
            suggestions: [],
            otherLanguages: matches
        };
    }

    // Determine the language with the highest score
    let topLanguage = undefined;
    let topScore = 0;

    for (const [lang, score] of Object.entries(languageRanking)) {
        if (score > topScore) {
            topScore = score;
            topLanguage = lang;
        }
    }

    // If no words matched any language
    if (!topScore) return {
        topLanguage: undefined,
        wordMatches: {
            valid: false,
            suggestions: [],
            otherLanguages: []
        }
    };

    // Generate suggestions for invalid words using Levenshtein
    if (topLanguage) {
        const topWordlist = languageWordlists[topLanguage];

        for (const word of words) {
            if (!wordMatches[word].valid) {
                wordMatches[word].suggestions = suggestFromDictionary(word, topWordlist, 5, 2);
            }
        }
    }

    return {
        topLanguage,
        wordMatches
    }
}

module.exports = {
    detectLanguage
};