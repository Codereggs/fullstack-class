const { average } = require('../utils/for_testing');

describe('Average', () => {
  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1);
  });

  test('many values', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5);
  });

  test('empty value', () => {
    expect(average([])).toBe(0);
  });

  test('Without array param', () => {
    expect(average()).toBeUndefined();
  });

  test('With other data param', () => {
    expect(average('esteban')).toBeUndefined();
    expect(average(132165)).toBeUndefined();
    expect(average(undefined)).toBeUndefined();
    expect(average(true)).toBeUndefined();
  });
});
