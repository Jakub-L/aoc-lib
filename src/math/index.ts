/**
 * Returns the sum of all numbers in the given array.
 *
 * @param arr - The array of numbers to sum.
 * @returns The sum of all numbers in the array.
 */
export const sum = (arr: number[]): number => arr.reduce((a, b) => a + b, 0);

/**
 * Returns the product of all numbers in the given array.
 *
 * @param arr - The array of numbers to multiply.
 * @returns The product of all numbers in the array.
 */
export const prod = (arr: number[]): number => arr.reduce((a, b) => a * b, 1);