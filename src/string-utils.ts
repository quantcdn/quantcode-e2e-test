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
 * The "..." ellipsis counts toward maxLength.
 * Returns the string unchanged if it already fits within maxLength.
 */
export function truncate(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str

  const ellipsis = "..."
  const source = str.trim()
  if (source.length <= maxLength) return source
  if (maxLength <= ellipsis.length) return source.slice(0, Math.max(0, maxLength))

  const available = maxLength - ellipsis.length
  const head = source.slice(0, available)
  const lastSpace = head.lastIndexOf(" ")
  const wordCut = lastSpace > 0 ? head.slice(0, lastSpace).trimEnd() : ""

  return (wordCut || head.trimEnd()) + ellipsis
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
