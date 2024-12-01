import { readFileSync } from "fs";

type Converter = (x: string) => any;
const identity = <T>(x: T): T => x;

/**
 * Reads a file from the given path and returns its contents split by the given delimiters.
 * @param {string} path - The path of the file to read.
 * @param {string[]} [delimiters=["\n"]] - An array of delimiters to split the file contents by. Defaults to ["\n"].
 * @param {Converter} [converter=identity] - A function to apply to the file contents after splitting. Defaults to the identity function.
 * @returns {any} An array of elements representing the contents of the file split by the given delimiters.
 */
export const readFile = (path: string, delimiters: string[] = ["\n"], converter: Converter = identity): any => {
  return split(readFileSync(path, "utf-8"), delimiters, converter);
};

/**
 * Splits a string by the given delimiters.
 * @param {string} str - The string to split.
 * @param {string[]} [delimiters=[]] - An array of delimiters to split the string by.
 * @param {Converter} [converter=identity] - A function to apply to the file contents after splitting. Defaults to the identity function.
 * @returns {any} An array of elements representing the string split by the given delimiters.
 */
export const split = (str: string, delimiters: string[] = [], converter: Converter = identity): any => {
  if (delimiters.length === 0) return converter(str);
  const [delimiter, ...remainingDelimiters] = delimiters;
  return str.split(delimiter).map(s => split(s, remainingDelimiters, converter));
};
