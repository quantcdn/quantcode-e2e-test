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
 * Truncate a string to maxLength, cutting at a word boundary where possible.
 * The "..." ellipsis counts toward maxLength, so the result is never longer
 * than maxLength. Returns the string unchanged if it already fits.
 */
export function truncate(str: string, maxLength: number): string {
  if (maxLength <= 0) return ""
  if (str.length <= maxLength) return str

  const ellipsis = "..."
  if (maxLength <= ellipsis.length) return str.slice(0, maxLength)

  const budget = maxLength - ellipsis.length
  const candidate = str.slice(0, budget)
  const lastSpace = candidate.lastIndexOf(" ")
  const body = lastSpace > 0 ? candidate.slice(0, lastSpace) : candidate

  return (body.trimEnd() || candidate.trimEnd()) + ellipsis
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
