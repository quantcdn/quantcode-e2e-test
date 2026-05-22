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
  // Find the last word boundary that fits within maxLength - 3 (room for "...")
  const limit = maxLength - 3
  const cut = str.slice(0, limit)
  const lastSpace = cut.lastIndexOf(" ")
  if (lastSpace > 0) {
    return cut.slice(0, lastSpace) + "..."
  }
  return cut + "..."
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function wordCount(str: string): number {
  if (!str.trim()) return 0
  return str.split(/\s+/).filter((w) => w.length > 0).length
}
