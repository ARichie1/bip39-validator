const { isValidWord, validateWords, suggestWord, isValidMnemonic } = require('../src/index');

test('valid single word', () => { 
    expect(isValidWord('apple')).toBe(true); 
});

test('invalid single word', () => { 
    expect(isValidWord('applx')).toBe(false); 
    expect(suggestWord('applx')).toBe('apple'); 
});

test('validateWords function', () => { 
    const result = validateWords(['apple', 'zebra', 'amaze', 'reply']); 
    expect(result.valid).toContain('apple');
    expect(result.invalid).toContain('amaze'); 
});

test('validate full mnemonic', () => { 
    const validPhrase = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'; 
    expect(isValidMnemonic(validPhrase)).toBe(true); 
});