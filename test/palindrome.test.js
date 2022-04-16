const { palindrome } = require('../utils/for_testing');

test('Palindrome of esteban', () => {
  const result = palindrome('esteban');
  expect(result).toBe('nabetse');
});

test('palindrome of empty string', () => {
  const result = palindrome('');
  expect(result).toBe('');
});

test('palindrome of undefined', () => {
  const result = palindrome();
  expect(result).toBeUndefined();
});
