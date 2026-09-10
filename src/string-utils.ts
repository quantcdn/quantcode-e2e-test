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
  const limit = Math.max(0, maxLength)
  if (str.length <= limit) return str
  if (limit <= ELLIPSIS.length) return str.slice(0, limit)

  const budget = limit - ELLIPSIS.length
  const head = str.slice(0, budget)
  const lastSpace = head.lastIndexOf(" ")
  const atBoundary = lastSpace > 0 ? head.slice(0, lastSpace) : head
  const truncated = atBoundary.trimEnd() || head.trimEnd()
  return truncated + ELLIPSIS
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
