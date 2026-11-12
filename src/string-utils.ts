/**
 * String utility functions.
 */

/**
 * Upper-case the first character of a string, leaving the rest unchanged.
 *
 * @param str - The string to capitalise.
 * @returns The string with its first character upper-cased, or `str` itself if it is empty.
 */
export function capitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Reverse the characters of a string (by UTF-16 code unit).
 *
 * @param str - The string to reverse.
 * @returns A new string with the characters in reverse order.
 */
export function reverse(str: string): string {
  return str.split("").reverse().join("")
}

// TODO: implement truncate — should truncate at a word boundary, with "..."
// counting toward maxLength. Return unchanged if str.length <= maxLength.
/**
 * Truncate a string to a maximum length. Not yet implemented.
 *
 * @param str - The string to truncate.
 * @param maxLength - The maximum permitted length of the result.
 * @returns The truncated string.
 * @throws {Error} Always, with message "not implemented", until implemented.
 */
export function truncate(str: string, maxLength: number): string {
  throw new Error("not implemented")
}

/**
 * Convert a string to a URL-friendly slug: lower-cased, with each run of
 * characters other than ASCII letters and digits (a-z, 0-9) replaced by a single
 * hyphen and leading or trailing hyphens removed. Non-ASCII characters, including
 * accented letters such as "é", are treated as separators and are not preserved.
 *
 * @param str - The string to convert.
 * @returns The slugified string.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

// BUG: This doesn't handle multiple consecutive spaces
/**
 * Count the words in a string, splitting on single space characters.
 * Consecutive spaces are not collapsed and so can inflate the count.
 *
 * @param str - The string to count words in.
 * @returns The number of words, or 0 if the string is empty or whitespace only.
 */
export function wordCount(str: string): number {
  if (!str.trim()) return 0
  return str.split(" ").length
}
