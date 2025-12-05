const {
  isValidWord,
  validateWords,
  isValidMnemonic,
  suggestWord,
  detectLanguage
} = require("../src/index");

describe("bip39-validator core API", () => {
  const validEnglishMnemonic =
    "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

  test("isValidWord returns true for valid English word", () => {
    expect(isValidWord("abandon", "english")).toBe(true);
  });

  test("isValidWord returns false for invalid word", () => {
    expect(isValidWord("helloworld", "english")).toBe(false);
  });

  test("validateWords separates valid and invalid words", () => {
    const result = validateWords(["abandon", "hello", "zebra"], "english");
    expect(result.validWords).toContain("abandon");
    expect(result.invalidWords.length).toBe(0);
  });

  test("isValidMnemonic returns true for known good mnemonic", () => {
    const result = isValidMnemonic(validEnglishMnemonic, "english");
    expect(result.valid).toBe(true);
    expect(result.error).toBe("");
  });

  test("isValidMnemonic returns unknown_words for invalid word", () => {
    const bad =
      "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon friday";
    const result = isValidMnemonic(bad, "english");
    
    expect(result.valid).toBe(false);
    expect(result.error).toBe("unknown_words");
    expect(result.invalidWords).toContain("friday");
  });

  test("isValidMnemonic returns invalid_checksum for broken checksum", () => {
    const bad =
      "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon";
    const result = isValidMnemonic(bad, "english");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("invalid_checksum");
  });

  test("suggestWord returns close matches", () => {
    const sugg = suggestWord("abandn", "english");
    expect(Array.isArray(sugg)).toBe(true);
    expect(sugg.length).toBeGreaterThan(0);
  });

  test("detectLanguages returns alternative languages matches", () => {
    const matches = detectLanguage("abandn potato");
    expect(matches.topLanguage).toBe("english");
    expect(matches.wordMatches["abandn"].suggestions.length).toBe(1);
  });
});
