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
 * Truncate a string at a word boundary, with "..." counting toward maxLength.
 * Returns the string unchanged if str.length <= maxLength.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str

  const ellipsis = "..."
  if (maxLength <= 0) return ""
  if (maxLength <= ellipsis.length) return str.slice(0, maxLength)

  const budget = maxLength - ellipsis.length
  let slice = str.slice(0, budget)
  const lastSpace = slice.lastIndexOf(" ")
  if (lastSpace > 0) slice = slice.slice(0, lastSpace)

  return slice.trimEnd() + ellipsis
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
