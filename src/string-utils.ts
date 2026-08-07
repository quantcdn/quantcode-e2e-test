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

/**
 * Truncate a string to at most maxLength characters, cutting at a word
 * boundary. The "..." ellipsis counts toward maxLength. Returns the string
 * unchanged if it already fits.
 */
const ELLIPSIS = "..."

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  if (maxLength <= ELLIPSIS.length) return ELLIPSIS.slice(0, Math.max(maxLength, 0))

  const budget = maxLength - ELLIPSIS.length
  let slice = str.slice(0, budget)
  // Avoid splitting a UTF-16 surrogate pair (would emit a lone surrogate).
  if (slice.length > 0 && /[\uD800-\uDBFF]$/.test(slice)) {
    slice = slice.slice(0, -1)
  }
  const lastSpace = slice.search(/\s\S*$/)
  const cut = lastSpace > 0 ? slice.slice(0, lastSpace) : slice
  return cut.trimEnd() + ELLIPSIS
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function wordCount(str: string): number {
  const trimmed = str.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}
