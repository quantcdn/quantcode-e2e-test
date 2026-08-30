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
  if (!str || str.length <= maxLength) return str
  if (maxLength <= ELLIPSIS.length) return str.slice(0, Math.max(maxLength, 0))

  const budget = maxLength - ELLIPSIS.length
  const candidate = str.slice(0, budget)
  const lastSpace = candidate.lastIndexOf(" ")
  const body = lastSpace > 0 ? candidate.slice(0, lastSpace) : candidate

  return body.replace(/\s+$/, "") + ELLIPSIS
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function wordCount(str: string): number {
  if (!str || !str.trim()) return 0
  return str.trim().split(/\s+/).length
}
