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
 * Truncate at a word boundary with "..." counting toward maxLength.
 * Returns str unchanged if str.length <= maxLength. If maxLength is no more
 * than the ellipsis length, the result is the first maxLength characters of the
 * ellipsis (e.g. ".." for 2, "" for 0).
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  const ellipsis = "..."
  if (maxLength <= ellipsis.length) return ellipsis.slice(0, Math.max(0, maxLength))
  const limit = Math.max(0, maxLength - ellipsis.length)
  let cut = str.slice(0, limit)
  if (!/\s/.test(str.charAt(limit))) {
    const lastSpace = cut.search(/\s\S*$/)
    if (lastSpace > 0) cut = cut.slice(0, lastSpace)
  }
  return cut.trimEnd() + ellipsis
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function wordCount(str: string): number {
  if (!str.trim()) return 0
  return str.trim().split(/\s+/).length
}
