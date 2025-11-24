<div align="center">

<h1>📦 <strong>bip39-validator</strong></h1>

<h3>A blazing-fast, multi-language BIP-39 validator with CLI, suggestions, TypeScript, and full mnemonic checking.</h3>

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
- 🔥 Tiny, fast, production-ready  

---

## 🌍 Supported Languages

<table>
<tr><th>Language</th><th>Flag</th><th>Identifier</th></tr>

<tr><td>English</td><td><code>en</code><code>eng</code><code>english</code></td>
</tr>
<tr><td>Spanish</td><td><code>es</code><code>sp</code><code>spanish</code></td>
</tr>
<tr><td>French</td><td><code>fr</code><code>french</code></td></tr>
<tr><td>Italian</td><td><code>it</code><code>italian</code></td></tr>
<tr><td>Japanese</td><td><code>jp</code><code>ja</code><code>japanese</code></td></tr>
<tr><td>Korean</td><td><code>kr</code><code>ko</code><code>korean</code></td></tr>
<tr><td>Chinese (Simplified)</td><td><code>cn </code><code>zh-cn</code><code>chinese</code><code>chinese_simplified</code></td></tr>
<tr><td>Chinese (Traditional)</td><td><code>tw</code><code>zh-tw</code><code> chinese_traditional</code></td></tr>
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

console.log(validateWords(["apple", "hello", "zebra"]));
/* Output 👇🏾
{
  valid: ["apple"],
  invalid: ["hello", "zebra"]
}
*/

console.log(suggestWord("appl"));
// "apple"
</code></pre>

---

# 🧩 Validate Mnemonics

### English example

<pre><code class="language-js">
const phrase =
  "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

console.log(isValidMnemonic(phrase));
// true
</code></pre>

### Japanese example

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

Spanish:

<pre><code class="language-bash">
bip39check abaco hola --lang spanish
</code></pre>

Full mnemonic:

<pre><code class="language-bash">
bip39check --mnemonic "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
</code></pre>

Help:

<pre><code class="language-bash">
bip39check --help
</code></pre>

---

# 🧪 Run Tests

<pre><code class="language-bash">
npm test
</code></pre>

---

# 🤝 Contributing

Pull requests welcome. Improve languages, suggestions, or the CLI.

---

<div align="center">
<h3>❤️ Made with care — MIT License</h3>
</div>
