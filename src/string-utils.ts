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
 * boundary. The "..." ellipsis counts toward maxLength, so the result is
 * never longer than maxLength. Returns the string unchanged when it already
 * fits.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str

  const ellipsis = "..."
  const budget = maxLength - ellipsis.length
  if (budget <= 0) return ellipsis.slice(0, Math.max(maxLength, 0))

  let slice = str.slice(0, budget)

  // If the character that follows the cut is not whitespace we landed
  // mid-word, so fall back to the last word boundary inside the slice.
  if (!/\s/.test(str.charAt(budget))) {
    const lastSpace = slice.search(/\s\S*$/)
    if (lastSpace > 0) slice = slice.slice(0, lastSpace)
  }

  return slice.trimEnd() + ellipsis
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
