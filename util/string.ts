/**
 * Util functions for string manipulation
 */

/**
 * Capitalize the first letter of a string
 * @param str the string to capitalize
 * @returns the string with the first letter capitalized
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}