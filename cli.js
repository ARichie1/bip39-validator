#!/usr/bin/env node

const { isValidWord, validateWords, suggestWord, isValidMnemonic } = require("./src/index");

const args = process.argv.slice(2); let lang = 'english';

// check for language flag 
const langIndex = args.indexOf('--lang'); 
if (langIndex !== -1) { 
    lang = args[langIndex + 1]; 
    args.splice(langIndex, 2); 
}

if (args.length === 0) { 
    console.log("Usage:"); 
    console.log(" bip39check [ ...] [--lang ]"); 
    console.log(" bip39check --mnemonic [--lang ]"); 
    process.exit(0); 
}

if (args[0] === '--mnemonic') { 
const phrase = args.slice(1).join(' '); 
if (isValidMnemonic(phrase, lang)) { 
    console.log(`✓ Mnemonic is valid (${lang})`); 
} 
else { 
    console.log(`✗ Mnemonic is invalid (${lang})`); } 
} 
else { 
    const result = validateWords(args, lang); 
    console.log("Valid words:", result.valid); 
    console.log("Invalid words:", 
        result.invalid.map(w => `${w} (did you mean '${suggestWord(w, lang)}`)); 
}