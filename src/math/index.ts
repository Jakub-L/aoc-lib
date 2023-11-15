/**
 * Returns the sum of all numbers in the given array.
 *
 * @param {number[]} arr The array of numbers to sum.
 * @returns {number} The sum of all numbers in the array.
 */
export const sum = (arr: number[]): number => arr.reduce((a, b) => a + b, 0);

/**
 * Returns the product of all numbers in the given array.
 *
 * @param {number[]} arr The array of numbers to multiply.
 * @returns {number} The product of all numbers in the array.
 */
export const prod = (arr: number[]): number => arr.reduce((a, b) => a * b, 1);

/**
 * Calculates the greatest common divisor of two numbers.
 * @param {number} a First number
 * @param {number} b Second number
 * @returns {number} The greatest common divisor of a and b.
 */
export const gcd = (a: number, b: number): number => {
  if (b === 0) return Math.abs(a);
  return gcd(Math.abs(b), Math.abs(a % b));
}