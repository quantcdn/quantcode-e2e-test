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
 * Truncate at a word boundary, with "..." counting toward maxLength.
 * Returns the string unchanged if str.length <= maxLength. Never exceeds maxLength.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  const ellipsis = "..."
  if (maxLength < ellipsis.length) return str.slice(0, Math.max(0, maxLength))
  const limit = Math.max(0, maxLength - ellipsis.length)
  let cut = str.slice(0, limit)
  if (str.charAt(limit) !== " ") {
    const idx = cut.lastIndexOf(" ")
    if (idx > 0) cut = cut.slice(0, idx)
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
