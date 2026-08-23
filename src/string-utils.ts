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
 */
export function truncate(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str
  if (maxLength <= ELLIPSIS.length) return str.slice(0, Math.max(maxLength, 0))

  const budget = maxLength - ELLIPSIS.length
  const head = str.slice(0, budget)
  const lastSpace = head.search(/\s\S*$/)
  const body = lastSpace > 0 ? head.slice(0, lastSpace) : head
  return body.trimEnd() + ELLIPSIS
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
