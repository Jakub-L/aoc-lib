import { readFileSync } from "fs";

type Element = Array<Element> | string;

/**
 * Reads a file from the given path and returns its contents split by the given delimiters.
 * @param {string} path - The path of the file to read.
 * @param {string[]} [delimiters=["\n"]] - An array of delimiters to split the file contents by. Defaults to ["\n"].
 * @returns {Element[]} An array of elements representing the contents of the file split by the given delimiters.
 */
export const readFile = (path: string, delimiters: string[] = ["\n"]): Element => {
  return split(readFileSync(path, "utf-8"), delimiters);
};

/**
 * Splits a string by the given delimiters.
 * @param {string} str - The string to split.
 * @param {string[]} [delimiters=[]] - An array of delimiters to split the string by.
 * @returns {Element[]} An array of elements representing the string split by the given delimiters.
 */
export const split = (str: string, delimiters: string[] = []): Element => {
  if (delimiters.length === 0) return str;
  const [delimiter, ...remainingDelimiters] = delimiters;
  return str.split(delimiter).map(s => split(s, remainingDelimiters));
};
