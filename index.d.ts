export type ValidationError =
  | "invalid_words"
  | "invalid_length"
  | "unknown_words"
  | "invalid_checksum"
  | ""

export interface ValidationResult {
  valid: boolean;
  language: string;
  error: ValidationError;
  validWords: string[];
  invalidWords: string[];
  suggestions?: Record<string, string[]>;
}

/**
 * Check if a single word is valid BIP-39 word
 * for the given language (default: english).
 */
export function isValidWord(word: string, language?: string): boolean;

/**
 * Validate an array of BIP-39 words.
 */
export function validateWords(
  words: string[],
  language?: string
): (ValidationResult);

/**
 * Validate a full BIP-39 mnemonic phrase with checksum.
 */
export function isValidMnemonic(
  mnemonic: string,
  language?: string
): ValidationResult;

/**
 * Suggest possible valid BIP-39 words for a given typo/partial word.
 */
export function suggestWord(
  input: string,
  language?: string,
  maxSuggestions?: number
): string[];
