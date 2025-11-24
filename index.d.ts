export function isValidWord(word: string, lang?: string): boolean; 
export function validateWords(words: string[], lang?: string): { valid: string[], invalid: string[] }; 
export function suggestWord(word: string, lang?: string): string; 
export function isValidMnemonic(phrase: string, lang?: string): boolean;