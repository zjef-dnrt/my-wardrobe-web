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

/**
 * Creates a unique identifier
 * @returns a random UUID
 */
export const uuid = (): string => {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};