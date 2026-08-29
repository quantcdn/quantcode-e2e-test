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
 * Truncate a string at a word boundary, appending "...".
 * The ellipsis counts toward maxLength, so the result never exceeds it.
 * Returns the string unchanged if it already fits within maxLength.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str

  const ellipsis = "..."
  if (maxLength <= ellipsis.length) return str.slice(0, maxLength)

  const budget = maxLength - ellipsis.length
  const clipped = str.slice(0, budget)
  const lastSpace = clipped.lastIndexOf(" ")
  const body = lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped

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
