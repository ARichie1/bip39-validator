import { wordlists } from 'bip39';

const { english, spanish, french, italian, japanese,
    korean, chinese_simplified, chinese_traditional } = wordlists;

const languageWordlists = {
    english, spanish, french, italian, japanese,
    korean, chinese_simplified, chinese_traditional
};

export function detectLanguage(input) {
    const words = input.trim().toLowerCase().split(/\s+/);

    // Ranking object (score per language)
    const languageRanking = {
        english: 0, spanish: 0, french: 0,
        italian: 0, japanese: 0, korean: 0,
        chinese_simplified: 0, chinese_traditional: 0
    };

    // Score each word
    for (const word of words) {
        for (const [lang, wordlist] of Object.entries(languageWordlists)) {
            if (wordlist.includes(word)) {
                languageRanking[lang] += 1;
            }
        }
    }

    // Determine best scoring language
    let topLanguage = undefined;
    let topScore = 0;

    for (const [lang, score] of Object.entries(languageRanking)) {
        if (score > topScore) {
            topScore = score;
            topLanguage = lang;
        }
    }

    // If top score is 0 → no match at all
    if (!topScore) return undefined;

    return topLanguage;
}
