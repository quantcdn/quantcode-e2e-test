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
 * Truncate a string at a word boundary, appending "..." which counts toward
 * maxLength. Returns the string unchanged if str.length <= maxLength.
 */
export function truncate(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str

  const ellipsis = "..."
  if (maxLength <= ellipsis.length) return str.slice(0, Math.max(0, maxLength))

  const budget = maxLength - ellipsis.length
  const slice = str.slice(0, budget)
  const lastSpace = slice.lastIndexOf(" ")
  const head = lastSpace > 0 ? slice.slice(0, lastSpace) : slice

  return head.trimEnd() + ellipsis
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
