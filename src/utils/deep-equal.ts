/**
 * Compares two values for deep equality, by value
 * @param {any} a First value to compare
 * @param {any} b Second value to compare
 * @returns {boolean} True if values are deeply equal, false otherwise
 */
export const deepEqual = (a: any, b: any): boolean => {
  // Primitives
  if (a === b) return true;

  if (a && b && typeof a === "object" && typeof b === "object") {
    if (a.constructor !== b.constructor) return false;

    // Arrays
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i])) return false;
      }
      return true;
    }

    // Sets
    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      for (const item of a) {
        if (!b.has(item)) return false;
      }
      return true;
    }

    // Maps
    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      for (const [key, value] of a) {
        if (!b.has(key) || !deepEqual(value, b.get(key))) return false;
      }
      return true;
    }

    // Regular expressions
    if (a instanceof RegExp && b instanceof RegExp) return a.source === b.source && a.flags === b.flags;

    // Symbols
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    // Objects
    if (Object.keys(a).length !== Object.keys(b).length) return false;
    for (const key in a) {
      if (!(key in b) || !deepEqual(a[key], b[key])) return false;
    }
    return true;
  }
  // NaN
  if (Number.isNaN(a) && Number.isNaN(b)) return true;

  return false;
};
