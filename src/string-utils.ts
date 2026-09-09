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
 * Truncate a string to at most maxLength characters, breaking on a word
 * boundary and appending an ellipsis. The ellipsis counts toward maxLength,
 * so the result is never longer than maxLength.
 *
 * Returns the string unchanged when it already fits within maxLength.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str

  const ellipsis = "..."
  // No room for content alongside the ellipsis — hard-cut to maxLength.
  if (maxLength <= ellipsis.length) return str.slice(0, Math.max(maxLength, 0))

  const budget = maxLength - ellipsis.length
  const candidate = str.slice(0, budget)
  const lastSpace = candidate.lastIndexOf(" ")
  const body = lastSpace > 0 ? candidate.slice(0, lastSpace) : candidate

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
