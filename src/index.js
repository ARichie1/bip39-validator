const bip39 = require("bip39"); 
const { get } = require("lodash"); 
const levenshtein = require("fast-levenshtein");

function isValidWord(word, lang = 'english') { 
    const list = get(bip39.wordlists, lang); 
    if (!list) {
        throw new Error(`Unsupported language: ${lang}`)
    }
    return list.includes(word.toLowerCase()); 
}

function validateWords(words, lang = 'english') { 
    const valid = []; const invalid = [];
    for (const w of words) { 
        if (isValidWord(w, lang)) 
            valid.push(w); 
        else invalid.push(w); 
    }
    return { valid, invalid };
}

function suggestWord(word, lang = 'english') { 
    const list = get(bip39.wordlists, lang); 
    if (!list) {
        throw new Error(`Unsupported language: ${lang}`)
    } 
    let closest = null; let minDist = Infinity;
    list.forEach(w => { const dist = levenshtein.get(word, w); if (dist < minDist) { minDist = dist; closest = w; } });
    return closest; 
}

function isValidMnemonic(phrase, lang = 'english') { 
    return bip39.validateMnemonic(phrase, get(bip39.wordlists, lang)); 
}

module.exports = { isValidWord, validateWords, suggestWord, isValidMnemonic };