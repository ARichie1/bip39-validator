#!/usr/bin/env node

const { 
  isValidWord, 
  validateWords, 
  suggestWord, 
  isValidMnemonic 
} = require("./src/index");

// Language aliases
const LANGUAGE_ALIASES = {
  en: "english",
  eng: "english",
  english: "english",

  es: "spanish",
  sp: "spanish",
  spanish: "spanish",

  fr: "french",
  french: "french",

  it: "italian",
  italian: "italian",

  jp: "japanese",
  ja: "japanese",
  japanese: "japanese",

  kr: "korean",
  ko: "korean",
  korean: "korean",

  cn: "chinese_simplified",
  "zh-cn": "chinese_simplified",
  chinese: "chinese_simplified",
  chinese_simplified: "chinese_simplified",

  "zh-tw": "chinese_traditional",
  tw: "chinese_traditional",
  chinese_traditional: "chinese_traditional"
};

function normalizeLang(input) {
  if (!input) return "english";
  const key = input.toLowerCase();
  return LANGUAGE_ALIASES[key] || null;
}

// Parse CLI arguments
const args = process.argv.slice(2);
let lang = "english";

// Detect --lang <name>
const langIndex = args.indexOf("--lang");
if (langIndex !== -1 && args[langIndex + 1]) {
  const normalized = normalizeLang(args[langIndex + 1]);
  if (!normalized) {
    console.log(`✗ Unsupported language: ${args[langIndex + 1]}`);
    process.exit(1);
  }
  lang = normalized;
  args.splice(langIndex, 2);
}

// Detect short flags like --jp, --es, --cn
args.forEach((arg) => {
  if (arg.startsWith("--")) {
    const flag = arg.replace("--", "");
    if (LANGUAGE_ALIASES[flag]) {
      lang = LANGUAGE_ALIASES[flag];
    }
  }
});

// HELP MESSAGE
if (args.length === 0 || args.includes("--help")) {
  console.log(`
    Usage:
        bip39check <word(s)> [options]

    Examples:
        bip39check apple
        bip39check apple zebra lemon
        bip39check --mnemonic "apple zebra lemon"
        bip39check --es manzana
        bip39check palabra --lang spanish

    Options:
        --mnemonic "<phrase>"   Validate a full mnemonic instead of individual words
        --lang <language>       english | spanish | french | italian | japanese | korean | chinese_simplified | chinese_traditional

    Language Shortcuts:
        English  : --en, --eng
        Spanish  : --es, --sp
        French   : --fr
        Italian  : --it
        Japanese : --jp, --ja
        Korean   : --kr, --ko
        Chinese (Simplified)  : --cn, --zh-cn
        Chinese (Traditional) : --tw, --zh-tw
    `);
  process.exit(0);
}

// MNEMONIC CHECK 
if (args[0] === "--mnemonic") {
  const phrase = args.slice(1).join(" ");

  if (!phrase.trim()) {
    console.log("✗ No mnemonic provided.");
    process.exit(1);
  }

  if (isValidMnemonic(phrase, lang)) {
    console.log(`✓ Mnemonic is valid (${lang})`);
  } else {
    console.log(`✗ Mnemonic is invalid (${lang})`);
  }

  process.exit(0);
}

// WORD VALIDATION
const result = validateWords(args, lang);

console.log("Valid words:", result.valid);

if (result.invalid.length === 0) {
  console.log("Invalid words: []");
} else {
  console.log(
    "Invalid words:",
    result.invalid.map((w) => {
      const suggestion = suggestWord(w, lang);
      return suggestion
        ? `${w} (did you mean '${suggestion}'?)`
        : `${w} (no suggestion)`;
    })
  );
}
