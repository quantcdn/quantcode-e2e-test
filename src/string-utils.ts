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

const ELLIPSIS = "..."

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str

  const budget = maxLength - ELLIPSIS.length
  if (budget <= 0) return str.slice(0, Math.max(maxLength, 0))

  const lastSpace = str.slice(0, budget + 1).lastIndexOf(" ")
  const head = lastSpace > 0 ? str.slice(0, lastSpace) : str.slice(0, budget)

  return head.trimEnd() + ELLIPSIS
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
