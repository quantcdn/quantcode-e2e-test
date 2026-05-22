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
  const suffix = "..."
  const budget = maxLength - suffix.length
  if (budget <= 0) return str.slice(0, maxLength)
  const truncated = str.slice(0, budget)
  const lastSpace = truncated.lastIndexOf(" ")
  if (lastSpace > 0) return truncated.slice(0, lastSpace) + suffix
  return truncated + suffix
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
