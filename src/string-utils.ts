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
  if (maxLength <= ELLIPSIS.length) return str.slice(0, Math.max(0, maxLength))

  const budget = maxLength - ELLIPSIS.length
  const window = str.slice(0, budget)
  const lastSpace = window.lastIndexOf(" ")
  const head = lastSpace > 0 ? window.slice(0, lastSpace) : window

  return head.replace(/\s+$/, "") + ELLIPSIS
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
