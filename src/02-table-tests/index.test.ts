import { simpleCalculator } from './index';
import { Action } from '../01-simple-tests';

describe('simpleCalculator', () => {
  const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    {
      a: 2,
      b: 2,
      action: Action.Subtract,
      expected: 0,
    },
    {
      a: 2,
      b: 2,
      action: Action.Multiply,
      expected: 4,
    },
    {
      a: 4,
      b: 2,
      action: Action.Divide,
      expected: 2,
    },
    {
      a: 2,
      b: 2,
      action: Action.Exponentiate,
      expected: 4,
    },
    {
      a: 1,
      b: 2,
      action: 'blah',
      expected: null,
    },
    {
      a: 'blah',
      b: 2,
      action: Action.Add,
      expected: null,
    },
  ];

  it.each(testCases)(
    'should return $expected when $a $action $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
