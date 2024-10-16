import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(
      simpleCalculator({
        a: 1,
        b: 2,
        action: Action.Add,
      }),
    ).toEqual(3);
  });

  test('should subtract two numbers', () => {
    expect(
      simpleCalculator({
        a: 2,
        b: 2,
        action: Action.Subtract,
      }),
    ).toEqual(0);
  });

  test('should multiply two numbers', () => {
    expect(
      simpleCalculator({
        a: 2,
        b: 2,
        action: Action.Multiply,
      }),
    ).toEqual(4);
  });

  test('should divide two numbers', () => {
    expect(
      simpleCalculator({
        a: 4,
        b: 2,
        action: Action.Divide,
      }),
    ).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        a: 2,
        b: 2,
        action: Action.Exponentiate,
      }),
    ).toEqual(4);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({
        a: 1,
        b: 2,
        action: 'blah',
      }),
    ).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({
        a: 'blah',
        b: 2,
        action: Action.Add,
      }),
    ).toEqual(null);
  });
});
