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

// Truncates at a word boundary, with "..." counting toward maxLength.
// Returns the string unchanged if str.length <= maxLength.
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  const ellipsis = "..."
  if (maxLength < ellipsis.length) return str.slice(0, Math.max(0, maxLength))
  const limit = Math.max(0, maxLength - ellipsis.length)
  let cut = str.slice(0, limit + 1)
  const lastSpace = cut.lastIndexOf(" ")
  cut = lastSpace > 0 ? cut.slice(0, lastSpace) : str.slice(0, limit)
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
