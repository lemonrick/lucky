import { describe, expect, it } from 'vitest';
import { generateNumbers } from './generateNumbers.ts';

describe('generateNumbers', () => {
  it('returns exactly the requested amount of numbers', () => {
    const result = generateNumbers(6, 49);
    expect(result).toHaveLength(6);
  });

  it('returns numbers inside the expected range', () => {
    const result = generateNumbers(6, 49);
    result.forEach((value) => {
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(49);
    });
  });

  it('returns unique numbers sorted ascending', () => {
    const result = generateNumbers(6, 49);
    const uniqueCount = new Set(result).size;
    const sortedCopy = [...result].sort((a, b) => a - b);

    expect(uniqueCount).toBe(result.length);
    expect(result).toEqual(sortedCopy);
  });
});
