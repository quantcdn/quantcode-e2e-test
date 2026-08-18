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
 * Truncate a string to at most maxLength characters, cutting at a word
 * boundary where possible. The ellipsis counts toward maxLength, so the
 * returned string is never longer than maxLength.
 * Returns the string unchanged when it already fits, and "" when maxLength
 * is non-finite or not positive (no output can satisfy the invariant).
 */
export function truncate(str: string, maxLength: number): string {
  if (!Number.isFinite(maxLength) || maxLength <= 0) return ""
  if (str.length <= maxLength) return str
  if (maxLength <= ELLIPSIS.length) return str.slice(0, maxLength)

  const budget = maxLength - ELLIPSIS.length
  const head = str.slice(0, budget)
  const lastSpace = head.lastIndexOf(" ")
  const cut = lastSpace > 0 ? head.slice(0, lastSpace) : head
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
