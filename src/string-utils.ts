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

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  const ellipsis = "..."
  const budget = maxLength - ellipsis.length
  if (budget <= 0) return str.slice(0, maxLength)
  const cut = str.slice(0, budget)
  const lastSpace = cut.lastIndexOf(" ")
  const trimmed = lastSpace > 0 ? cut.slice(0, lastSpace) : cut
  return trimmed + ellipsis
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

// BUG: This doesn't handle multiple consecutive spaces
export function wordCount(str: string): number {
  return str.trim().split(/\s+/).filter(Boolean).length
}
