import { sum } from "../math";
type Iterable = Array<any> | Record<any, number> | Counter;

/** A counter class for counting elements of any type */
export class Counter {
  /** Map of counts for each element */
  private _counts: Map<any, number>;

  /**
   * Creates a new counter. Keys are treated as reference values. Note: If source is an
   * object, the keys will be strings, even if they were not originally.
   *
   * @param {Iterable} source - An iterable of elements to count
   */
  constructor(source?: Iterable) {
    this._counts = new Map<any, number>();
    if (Array.isArray(source)) {
      for (const element of source) {
        this.add(element);
      }
    } else if (source instanceof Counter) {
      this.combine(source);
    } else if (source) {
      for (const [element, count] of Object.entries(source)) {
        this.set(element, count);
      }
    }
  }

  /**
   * Increments the count of a given element by 1.
   * @param {any} element - Element to increment.
   */
  add(element: any) {
    this.set(element, this.get(element) + 1);
  }

  /**
   * Returns the count of a given element.
   * @param {any} element - Element to increment.
   * @returns {number} The count of the element
   */
  get(element: any): number {
    return this._counts.get(element) ?? 0;
  }

  /**
   * Sets the value of an element. Count can be negative.
   * @param {any} element - Element to set.
   * @param {number} count - Count of the element.
   */
  set(element: any, count: number) {
    this._counts.set(element, count);
  }

  /**
   * Deletes an element from the counter.
   * @param {any} element - Element to delete.
   * @returns {boolean} True if the element was deleted, false if it was not present.
   */
  delete(element: any): boolean {
    return this._counts.delete(element);
  }

  /**
   * Checks if an element is in the counter.
   * @param {any} element - Element to delete.
   * @returns {boolean} True if the element is present, false if it is not.
   */
  has(element: any): boolean {
    return this._counts.has(element);
  }

  /** Clears the counter */
  clear() {
    this._counts.clear();
  }

  /**
   * Returns the N most common elements and their counts
   * @param {number} [n] - Number of elements to return. If not specified, returns all elements.
   * @returns {Array<[any, number]>} The N most common elements and their counts in the form
   *      Array<[element, count]>
   */
  mostCommon(n?: number): Array<[any, number]> {
    if (n < 0) return [];
    return Array.from(this.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, n);
  }

  /**
   * Subtracts an iterable. This reduces the counts of this counter by the counts of the other.
   * If the other iterable is an Object, the keys will be strings, even if they were not originally.
   * Therefore:
   *    new Counter([1]).subtract({1: 1}) === Counter({1: 0, "1": -1})
   * @param {Iterable} other - The iterable to subtract from this counter.
   */
  subtract(other: Iterable) {
    if (Array.isArray(other)) {
      for (const element of other) this.set(element, this.get(element) - 1);
    } else if (other instanceof Counter) {
      for (const [element, count] of other.entries()) {
        this.set(element, this.get(element) - count);
      }
    } else {
      for (const [element, count] of Object.entries(other)) this.set(element, this.get(element) - count);
    }
  }

  /**
   * Adds an iterable. This increases the counts of this counter by the counts of the other.
   * If the other iterable is an Object, the keys will be strings, even if they were not originally.
   * Therefore:
   *    new Counter([1]).add({1: 1}) === Counter({1: 1, "1": 1})
   * @param {Iterable} other - The iterable to subtract from this counter.
   */
  combine(other: Iterable) {
    if (Array.isArray(other)) {
      for (const element of other) this.add(element);
    } else if (other instanceof Counter) {
      for (const [element, count] of other.entries()) {
        this.set(element, this.get(element) + count);
      }
    } else {
      for (const [element, count] of Object.entries(other)) this.set(element, this.get(element) + count);
    }
  }

  /**
   * Returns a string representation of the counter.
   * @returns {string} A string representation of the counter.
   */
  toString(): string {
    return `Counter({${Array.from(this.entries())
      .map(([element, count]) => `${element}: ${count}`)
      .join(", ")}})`;
  }

  /**
   * An iterator that returns each element the number of times it is counted.
   * @returns {IterableIterator<any>} An iterator of the elements.
   */
  *elements(): IterableIterator<any> {
    for (const [element, count] of this.entries()) {
      for (let i = 0; i < count; i++) {
        yield element;
      }
    }
  }

  /**
   * An iterator that returns the keys of the counter (i.e. the elements).
   * @returns {IterableIterator<any>} An iterator of the keys.
   */
  keys(): IterableIterator<any> {
    return this._counts.keys();
  }

  /**
   * An iterator that returns the values of the counter (i.e. the counts).
   * @returns {IterableIterator<any>} An iterator of the counts.
   */
  values(): IterableIterator<any> {
    return this._counts.values();
  }

  /**
   * An iterator that returns the entries of the counter (i.e. an array of [element, count]).
   * @returns {IterableIterator<[any, number]>} An iterator of the entries.
   */
  entries(): IterableIterator<[any, number]> {
    return this._counts.entries();
  }

  /**
   * Generic iterator. Returns entries of the counter (i.e. an array of [element, count]).
   * Alias for Counter.entries()
   * @returns {IterableIterator<[any, number]>} An iterator of the entries.
   */
  *[Symbol.iterator](): IterableIterator<[any, number]> {
    return this.entries();
  }

  /**
   * Returns the number of unique elements in the counter. Also includes elements
   * with a count of 0.
   * @returns {number} The number of unique elements in the counter.
   */
  get size(): number {
    return this._counts.size;
  }

  /**
   * Returns the sum of all counts in the counter.
   * @returns {number} The total number of elements in the counter.
   */
  get total(): number {
    return sum(Array.from(this.values()));
  }
}
