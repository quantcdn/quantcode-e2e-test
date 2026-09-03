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
 * Truncate a string at a word boundary, appending "..." where the ellipsis
 * counts toward maxLength. Returns the string unchanged if it already fits.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str

  if (maxLength <= 0) return ""

  const ellipsis = "..."
  if (maxLength <= ellipsis.length) return str.slice(0, maxLength)

  const budget = maxLength - ellipsis.length
  const head = str.slice(0, budget)
  const lastBoundary = head.search(/\s\S*$/)
  const body = lastBoundary > 0 ? head.slice(0, lastBoundary) : head

  return body.trimEnd() + ellipsis
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
