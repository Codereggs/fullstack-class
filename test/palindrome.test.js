const { palindrome } = require('../utils/for_testing');

test('Palindrome of esteban', () => {
  const result = palindrome('esteban');
  expect(result).toBe('nabetse');
});
