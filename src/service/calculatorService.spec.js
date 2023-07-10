const calculatorService = require('./calculatorService');

describe('calculatorService', () => {
  test('add', () => {
    const result = calculatorService.add(1, 2);
    expect(result).toBe(3);
  });
});