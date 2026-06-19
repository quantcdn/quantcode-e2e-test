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
  const budget = maxLength - 3
  if (budget < 0) return str.slice(0, maxLength)
  const trimmed = str.slice(0, budget)
  const lastSpace = trimmed.lastIndexOf(" ")
  const cut = lastSpace !== -1 ? trimmed.slice(0, lastSpace) : trimmed
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
  return str.trim().split(/\s+/).length
}
