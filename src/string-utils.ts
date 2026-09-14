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
 * Truncate a string at a word boundary, appending "..." such that the
 * result is never longer than maxLength. Returns the string unchanged
 * when it already fits.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  if (maxLength <= ELLIPSIS.length) return str.slice(0, maxLength)

  const budget = maxLength - ELLIPSIS.length
  const head = str.slice(0, budget)
  const lastSpace = head.lastIndexOf(" ")
  const body = (lastSpace > 0 ? head.slice(0, lastSpace) : head).trimEnd()

  return body + ELLIPSIS
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
