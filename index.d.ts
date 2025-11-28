export type ValidationErrorReason =
  | "invalid_length"
  | "unknown_words"
  | "invalid_checksum";

export interface MnemonicValidationResult {
  valid: boolean;
  reason?: ValidationErrorReason;
  invalidWords?: string[];
  suggestions?: Record<string, string[]>;
  language: string;
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
): {
  valid: string[];
  invalid: string[];
  suggestions: Record<string, string[]>;
};

/**
 * Validate a full BIP-39 mnemonic phrase with checksum.
 */
export function isValidMnemonic(
  mnemonic: string,
  language?: string
): MnemonicValidationResult;

/**
 * Suggest possible valid BIP-39 words for a given typo/partial word.
 */
export function suggestWord(
  input: string,
  language?: string,
  maxSuggestions?: number
): string[];
