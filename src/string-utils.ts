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
  if (budget <= 0) {
    return maxLength >= ELLIPSIS.length ? ELLIPSIS : str.slice(0, Math.max(maxLength, 0))
  }

  const window = str.slice(0, budget)
  const boundary = window.search(/\s+\S*$/)
  const head = boundary > 0 ? window.slice(0, boundary) : window

  return head.trimEnd() + ELLIPSIS
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function wordCount(str: string): number {
  const trimmed = str.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}
