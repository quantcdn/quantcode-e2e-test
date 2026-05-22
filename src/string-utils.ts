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

// TODO: implement truncate — should truncate at a word boundary, with "..."
// counting toward maxLength. Return unchanged if str.length <= maxLength.
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  const limit = maxLength - 3
  const truncated = str.slice(0, limit)
  const lastSpace = truncated.lastIndexOf(" ")
  if (lastSpace > 0) return truncated.slice(0, lastSpace) + "..."
  return truncated + "..."
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

// BUG: This doesn't handle multiple consecutive spaces
export function wordCount(str: string): number {
  if (!str.trim()) return 0
  return str.trim().split(/\s+/).filter(Boolean).length
}
