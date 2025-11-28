#!/usr/bin/env node

/* eslint-disable no-console */

const {
  isValidWord,
  validateWords,
  isValidMnemonic,
  suggestWord
} = require("./src/index");
const { LANGUAGE_ALIASES } = require("./src/languages");

function printHelp() {
  console.log(`
bip39check - Validate BIP-39 words and mnemonic phrases

Usage:
  bip39check <word1> [word2 word3 ...] [--lang <language>] [--mnemonic "<phrase>"]

Options:
  --mnemonic "<phrase>"   Validate a full mnemonic phrase (with checksum)
  --lang <language>       Language or code (en, es, fr, it, jp, kr, cn, tw, english, ...)
  --help                  Show this help

Examples:
  bip39check apple zebra
  bip39check apple --en
  bip39check abaco --es
  bip39check --mnemonic "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
`);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const words = [];
  let mnemonic = null;
  let lang = undefined;

  for (let i = 0; i < args.length; i++) {
    const a = args[i];

    if (a === "--help" || a === "-h") {
      return { help: true };
    }

    if (a === "--lang" || a === "-l") {
      lang = args[i + 1];
      i++;
      continue;
    }

    if (a === "--mnemonic") {
      mnemonic = args[i + 1];
      i++;
      continue;
    }

    if (a.startsWith("--")) {
      // unknown flag – ignore
      continue;
    }

    words.push(a);
  }

  return { words, mnemonic, lang, help: false };
}

function main() {
  const { words, mnemonic, lang, help } = parseArgs(process.argv);

  if (help || (!mnemonic && words.length === 0)) {
    printHelp();
    process.exit(0);
  }

  if (mnemonic) {
    const result = isValidMnemonic(mnemonic, lang);
    if (result.valid) {
      console.log("✅ Valid mnemonic.");
      console.log(`Language: ${result.language}`);
      process.exit(0);
    }

    console.log("❌ Invalid mnemonic.");
    console.log(`Reason: ${result.reason}`);
    if (result.invalidWords && result.invalidWords.length) {
      console.log("Invalid words:");
      for (const w of result.invalidWords) {
        console.log(`  - ${w}`);
        const sugg = result.suggestions?.[w];
        if (sugg && sugg.length) {
          console.log(`    Did you mean: ${sugg.join(", ")}`);
        }
      }
    }
    process.exit(1);
  }

  // Word mode
  const res = validateWords(words, lang);
  console.log("Language:", lang || "english (default)");
  console.log("Valid words:", res.valid);
  if (res.invalid.length) {
    console.log("Invalid words:");
    for (const w of res.invalid) {
      console.log(`  - ${w}`);
      const sugg = res.suggestions[w];
      if (sugg && sugg.length) {
        console.log(`    Suggestions: ${sugg.join(", ")}`);
      }
    }
    process.exit(1);
  } else {
    console.log("✅ All words are valid.");
    process.exit(0);
  }
}

main();
