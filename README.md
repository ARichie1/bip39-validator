A Node.js & CLI tool to 🔍 check BIP-39 words and 🔐mnemonic phrases. 

Supports multiple languages, spelling suggestions, and full mnemonic validation. 👍🏾

Install
npm install bip39-validator

or globally:
npm install -g bip39-validator

API Usage
const { isValidWord, validateWords, suggestWord, isValidMnemonic } = require('bip39-validator');


console.log(isValidWord('apple')); // true
console.log(validateWords(['apple','zebra','hello']));
console.log(suggestWord('appl')); // 'apple'
console.log(isValidMnemonic('abandon abandon abandon ...')); // true/false

CLI Usage

Single word
bip39check apple

Multiple words
bip39check apple zebra hello

With language (e.g., Spanish)
bip39check apple zebra --lang es

Check a full mnemonic phrase
bip39check --mnemonic "apple zebra ..." --lang en

Supported BIP39 Languages
english, chinese_simplified, chinese_traditional,
french, italian, japanese, korean, spanish

License
MIT

