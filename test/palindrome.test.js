const { palindrome } = require('../utils/for_testing');

describe.skip('Palindrome', () => {
  test('esteban', () => {
    const result = palindrome('esteban');
    expect(result).toBe('nabetse');
  });

  test('empty string', () => {
    const result = palindrome('');
    expect(result).toBe('');
  });

  test('undefined', () => {
    const result = palindrome();
    expect(result).toBeUndefined();
  });
});
