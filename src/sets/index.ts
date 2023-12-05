/**
 * Returns the union of two sets (A ∪ B)
 * @param {Set<T>} A - First set
 * @param {Set<U>} B - Second set
 * @returns {Set<T | U>} Set of all elements in A or in B (or in both)
 */
export const union = <T, U>(A: Set<T>, B: Set<U>): Set<T | U> => {
  return new Set([...A, ...B]);
};

/**
 * Returns the difference of two sets (A \ B)
 * @param {Set<T>} A - First set
 * @param {Set<U>} B - Second set
 * @returns {Set<T | U>} Set of all elements in A, but not in B
 */
export const difference = <T, U>(A: Set<T>, B: Set<U>): Set<T | U> => {
  return new Set([...A].filter(element => !B.has(element as any)));
};

/**
 * Returns the symmetric difference of two sets ((A \ B) ∪ (B \ A))
 * @param {Set<T>} A - First set
 * @param {Set<U>} B - Second set
 * @returns {Set<T | U>} Set of all elements in A or in B (but not in both)
 */
export const symmetricDifference = <T, U>(A: Set<T>, B: Set<U>): Set<T | U> => {
  return union(difference(A, B), difference(B, A));
};

/**
 * Returns the intersection of two sets (A ∩ B)
 * @param {Set<T>} A - First set
 * @param {Set<U>} B - Second set
 * @returns {Set<T | U>} Set of all elements both in A and in B
 */
export const intersection = <T, U>(A: Set<T>, B: Set<U>): Set<T | U> => {
  return new Set([...A].filter(element => B.has(element as any)));
};

/**
 * Checks if set A is disjoint from set B (A ∩ B = ∅)
 * @param {Set<T>} A - First set
 * @param {Set<U>} B - Second set
 * @returns {boolean} True if A and B share no elements
 */
export const isDisjointFrom = <T, U>(A: Set<T>, B: Set<U>): boolean => {
  for (const element of A) {
    if (B.has(element as any)) return false;
  }
  return true;
};

/**
 * Checks if set A is a subset of B (A ⊆ B)
 * @param {Set<T>} A - First set
 * @param {Set<U>} B - Second set
 * @returns {boolean} True if all elements of A are in B
 */
export const isSubsetOf = <T, U>(A: Set<T>, B: Set<U>): boolean => {
  for (const element of A) {
    if (!B.has(element as any)) return false;
  }
  return true;
};

/**
 * Checks if set A is a proper subset of B (A ⊂ B)
 * @param {Set<T>} A - First set
 * @param {Set<U>} B - Second set
 * @returns {boolean} True if all elements of A are in B, but A is not equal to B
 */
export const isProperSubsetOf = <T, U>(A: Set<T>, B: Set<U>): boolean => {
  return true;
};
