/**
 * String utility functions.
 */

export function capitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function reverse(str: string): string {
  return str.split("").reverse().join("")
}

const ELLIPSIS = "..."

/**
 * Truncate a string to maxLength, breaking at a word boundary where possible.
 * The ellipsis ("...") counts toward maxLength, so the result is never longer
 * than maxLength. Returns the string unchanged if it already fits.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  if (maxLength <= ELLIPSIS.length) return str.slice(0, maxLength)

  const budget = maxLength - ELLIPSIS.length
  const slice = str.slice(0, budget)
  const lastSpace = slice.lastIndexOf(" ")
  const body = lastSpace > 0 ? slice.slice(0, lastSpace) : slice

  return body.trimEnd() + ELLIPSIS
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function wordCount(str: string): number {
  if (!str.trim()) return 0
  return str.trim().split(/\s+/).length
}
