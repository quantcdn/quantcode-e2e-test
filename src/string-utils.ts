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
 * Truncate a string to at most maxLength characters, cutting back to a word
 * boundary and appending "..." — the ellipsis counts toward maxLength.
 * Returns the string unchanged if it already fits.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str

  const ellipsis = "..."
  const budget = maxLength - ellipsis.length
  if (budget <= 0) return str.slice(0, Math.max(0, maxLength))

  const head = str.slice(0, budget)
  const lastSpace = head.lastIndexOf(" ")
  const cut = lastSpace > 0 ? head.slice(0, lastSpace) : head
  return cut.trimEnd() + ellipsis
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
