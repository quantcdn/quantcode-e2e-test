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
  if (maxLength <= 3) return "..."
  const truncated = str.slice(0, maxLength - 3)
  const lastSpace = truncated.lastIndexOf(" ")
  const cut = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated
  return cut + "..."
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function wordCount(str: string): number {
  return str.trim().split(/\s+/).filter(Boolean).length
}
