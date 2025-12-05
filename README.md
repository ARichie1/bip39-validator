<div align="center">

<h1>📦 <strong>bip39-validator</strong></h1>

<h3>A blazing-fast, multi-language BIP-39 validator with CLI, suggestions, TypeScript types, and full mnemonic checksum validation.</h3>

<br/>

<!-- Badges -->
<p>
  <img src="https://img.shields.io/npm/v/bip39-validator?color=6f42c1&label=npm%20version" alt="npm version"/>
  <img src="https://img.shields.io/npm/dm/bip39-validator?color=brightgreen" alt="npm downloads"/>
  <img src="https://img.shields.io/npm/l/bip39-validator?color=yellow" alt="license"/>
  <img src="https://img.shields.io/badge/build-passing-success" alt="build"/>
  <img src="https://img.shields.io/badge/language-JS%20%2B%20TS-blue" alt="language"/>
</p>

<br/>

<img src="https://dummyimage.com/900x180/000/fff&text=BIP39+VALIDATOR" alt="banner" style="border-radius:12px; box-shadow:0 0 12px rgba(0,0,0,0.25);"/>

</div>

---

## ✨ Features

- 🔍 Validate single BIP-39 words  
- 🔠 Validate entire mnemonics  
- 🌍 Supports **8 official BIP-39 languages**  
- 🔧 CLI included: <code>bip39check</code>  
- 🧠 Smart spelling suggestions  
- ⚡ Zero external dependencies besides <code>bip39</code>  
- 📘 Full TypeScript definitions  
- 🏁 Short language flags (<code>--en</code>, <code>--es</code>, <code>--jp</code>)  
- 🔥 Tiny, fast, production-ready  

---

## 🌍 Supported Languages

<table>
<tr><th>Language</th><th>Short Flags</th><th>Full Flags <code>--lang 👉🏾flag👈🏾</code></th></tr>

<tr>
<td>English</td>
<td><code>--en</code> <code>--eng</code></td>
<td><code>english</code></td>
</tr>

<tr>
<td>Spanish</td>
<td><code>--es</code> <code>--sp</code></td>
<td><code>spanish</code></td>
</tr>

<tr>
<td>French</td>
<td><code>--fr</code></td>
<td><code>french</code></td>
</tr>

<tr>
<td>Italian</td>
<td><code>--it</code></td>
<td><code>italian</code></td>
</tr>

<tr>
<td>Japanese</td>
<td><code>--jp</code> <code>--ja</code></td>
<td><code>japanese</code></td>
</tr>

<tr>
<td>Korean</td>
<td><code>--kr</code> <code>--ko</code></td>
<td><code>korean</code></td>
</tr>

<tr>
<td>Chinese (Simplified)</td>
<td><code>--cn</code> <code>--zh-cn</code></td>
<td><code>chinese</code> <code>chinese_simplified</code></td>
</tr>

<tr>
<td>Chinese (Traditional)</td>
<td><code>--tw</code> <code>--zh-tw</code></td>
<td><code>chinese_traditional</code></td>
</tr>

</table>

---

# 🚀 Installation

<pre><code class="language-bash">
npm install bip39-validator
</code></pre>

Global CLI:

<pre><code class="language-bash">
npm install -g bip39-validator
</code></pre>

---

# 🧠 API Usage

<pre><code class="language-js">
const {
  isValidWord,
  validateWords,
  isValidMnemonic,
  suggestWord
} = require("bip39-validator");

console.log(isValidWord("apple")); 
// true

console.log(validateWords(["apple", "hello", "zebra"], "english"));
/* Output 👇🏾
{
  valid: true,
  language: 'english',
  error: 'invalid_words',
  validWords: [ 'apple' ],
  invalidWords: [ 'fin', 'zebr' ],
  suggestions: {
    fin: { words: [], alternativeLanguages: [spanish] },
    zebr: { words: [deer,near,pear,wear,web,zebra], alternativeLanguages: [] }
  }
}
*/

console.log(suggestWord("appl"));
// ["apple"]
</code></pre>

---

# 🧩 Validate Mnemonics

### English Example

<pre><code class="language-js">
const phrase =
  "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

console.log(isValidMnemonic(phrase, "english"));
// valid: true,
  language: english,
  error: "",
  validWords : ['abandon', 'abandon', 'abandon', 'abandon' 'abandon', 'abandon', 'abandon', 'abandon', 'abandon', 'abandon', 'abandon', 'about'],
  invalidWords : [],
  suggestions: {},
</code></pre>

### Japanese Example

<pre><code class="language-js">
const phrase =
"あいこくしん あいさつ あいだ あおぞら あかちゃん あきる あける あこがれる あさい あさひ";

console.log(isValidMnemonic(phrase, "japanese"));
</code></pre>

---

# 🛠️ CLI Usage

After global install:

<pre><code class="language-bash">
bip39check apple zebra
</code></pre>

### 🌍 Language Flags (Short & Full)

English:

<pre><code class="language-bash">
bip39check apple --en
bip39check apple --lang english
</code></pre>

Spanish:

<pre><code class="language-bash">
bip39check abaco --es
</code></pre>

Japanese:

<pre><code class="language-bash">
bip39check あいさつ --jp
</code></pre>

Chinese Simplified:

<pre><code class="language-bash">
bip39check 苹果 --cn
</code></pre>

---

## 🧩 Validate Full Mnemonic

<pre><code class="language-bash">
bip39check --mnemonic "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
</code></pre>

---

## 📘 Help

<pre><code class="language-bash">
bip39check --help
</code></pre>

---

# 🧪 Run Tests

<pre><code class="language-bash">
npm test
</code></pre>

---

# 🔐 Security

This library is designed with security in mind:

- ✅ No logging of mnemonics or words
- ✅ No network calls – everything runs locally
- ✅ Uses the official `bip39` wordlists & checksum logic
- ✅ Validates both word membership **and** BIP-39 checksum
- ✅ Works in Node.js and can be bundled for browser/extension use

> Important: this package **does not** generate keys, addresses, or wallets.  
> It only validates BIP-39 phrases; you remain in full control of how you handle secrets.

---

# 🆚 Why use this instead of `bip39` directly?

`bip39` is a great low-level library, but `bip39-validator` gives you a focused, higher-level API:

<table>
<tr><th>Feature</th><th>bip39</th><th>bip39-validator</th></tr>

<tr>
<td>Full wallet/seed generation</td>
<td>✔</td><td>✖</td>
</tr>

<tr>
<td>Mnemonic validation</td>
<td>✔ (low-level)</td><td>✔ (high-level)</td>
</tr>

<tr>
<td>Human-friendly error reasons</td>
<td>✖</td>
<td>✔ (`invalid_checksum`, `unknown_words`, etc.)</td>
</tr>

<tr>
<td>Smart typo suggestions</td>
<td>✖</td>
<td>✔</td>
</tr>

<tr>
<td>Multi-language CLI with flags</td>
<td>✖</td>
<td>✔ (`--en`, `--es`, …)</td>
</tr>

<tr>
<td>Security-focused, no logging</td>
<td>✖ depends on usage</td>
<td>✔ by design</td>
</tr>

<tr>If you only need **validation + suggestions** for wallet UIs, `bip39-validator` is smaller, safer, and more ergonomic.</tr>

</table>

---

# 🧪 Playground

A small interactive playground:

> https://bip39-validator-app.vercel.app/ 

You’ll be able to:

- Paste a mnemonic
- See if it’s valid
- See why it fails (checksum, length, unknown words)
- Get suggestions for mistyped words

---

# 🛠 Migration Guide: v1.x → v2.0 → 3.0

<h3>🚨 Breaking Changes</h3>

<h4>1. <code>validateWords()</code> behavior updated</h4>

<table>
  <thead>
    <tr>
      <th>Old behavior</th>
      <th>New behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Returned <code>valid: all words</code> and <code>invalid: []</code> even for unknown words</td>
      <td>Separates <code>valid</code> and <code>invalid</code> words correctly</td>
    </tr>
    <tr>
      <td>Did not provide suggestions</td>
      <td>Returns <code>suggestions</code> for invalid words (array of closest matches)</td>
    </tr>
  </tbody>
</table>

<p><strong>Impact:</strong> Code assuming all words were valid will now see <code>invalid</code> populated.</p>

<pre><code class="language-js">
// v1.x
const res = validateWords(["abandon", "hello", "zebra"], "english");
console.log(res.invalid); 
// output: []

// v2.0
console.log(res.invalid);
// output: ["pototoes", "monday"]
console.log(res.suggestions);
// { potatoes: [...], monday: [...] }

// v3.0
console.log(res.invalidWords);
// output: ["hello", "zebra"]
console.log(res.suggestions);
// { potatoes: [...], monday: [...] }
</code></pre>

<h4>2. <code>isValidMnemonic()</code> behavior updated</h4>

<table>
  <thead>
    <tr>
      <th>Old behavior</th>
      <th>New behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Returned <code>true/false</code> only</td>
      <td>Returns <code>{ valid, reason, invalidWords, suggestions, language }</code></td>
    </tr>
    <tr>
      <td>Invalid words or checksum failures were not detailed</td>
      <td>Detailed <code>reason</code> (<code>invalid_length</code>, <code>unknown_words</code>, <code>invalid_checksum</code>) and <code>invalidWords</code> array included</td>
    </tr>
  </tbody>
</table>

<pre><code class="language-js">
// v1.x
const result = isValidMnemonic("abandon ... monday", "english");
console.log(result);
// output: false (no reason)

// v2.0
console.log(result);
/* output:
{
  valid: false,
  reason: "unknown_words",
  invalidWords: ["monday"],
  suggestions: { monday: [today] },
  language: "english"
}
// v3.0
console.log(result);
/* output:
{
  valid: false,
  language: "english"
  error: "unknown_words",
  validWords: ["potato"],
  invalidWords: ["monday"],
  suggestions: { friday: ["today"] },
}
*/
</code></pre>

<h4>3. New fields in result objects</h4>

<ul>
  <li><code>valid</code> – true/false based on the validation</li>
  <li><code>language</code> – detected or selected language</li>
  <li><code>reason</code> – explains why validation failed</li>
  <li><code>validWords</code> – lists words in the BIP39 wordlist</li>
  <li><code>invalidWords</code> – lists words not in the BIP39 wordlist</li>
  <li><code>suggestions</code> – provides typo-corrected word suggestions</li>
</ul>

<h3>✅ How to Upgrade Your Code</h3>

<p><strong>Check for <code>result.valid</code> instead of old boolean return:</strong></p>

<pre><code class="language-js">
const res = isValidMnemonic(mnemonic);

if (!res.valid) {
  // instead of console.log("Mnemonic invalid because:", res.reason); do this
  console.log("Mnemonic invalid because:", res.error);
  if (res.invalidWords.length > 0) {
    console.log("Invalid words:", res.invalidWords);
  }
}
</code></pre>

<p><strong>Use <code>validateWords()</code> suggestions for UI autocomplete:</strong></p>

<pre><code class="language-js">
const res = validateWords(["abandon", "helo"], "english");
res.invalidWords.forEach(word => {
  console.log(`"${word}" is invalid. Did you mean?`, res.suggestions[word]);
});
</code></pre>

<p><strong>Language handling:</strong> You can still pass <code>"english"</code>, <code>"en"</code>, or leave undefined for auto-detect.</p>

<h3>⚡ Summary</h3>

<ul>
  <li>Major version bump → <code>3.0.0</code></li>
  <li>All old code using <code>validateWords</code> or <code>isValidMnemonic</code> needs minor adjustments</li>
  <li>New API gives clearer failure reasons, invalid words, and suggestions</li>
  <li>Everything else (Node support, CLI, security) is backwards compatible</li>
</ul>

---

# 🤝 Contributing
Pull requests welcome!  

> https://github.com/ARichie1/bip39-validator

---

<div align="center">
<h3>Made with ❤️ — MIT License</h3>
</div>
