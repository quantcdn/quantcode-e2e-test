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
  const max = Number.isNaN(maxLength) ? 0 : Math.max(0, Math.floor(maxLength))
  if (str.length <= max) return str
  const ellipsis = "..."
  if (max < ellipsis.length) return ellipsis.slice(0, max)
  const limit = max - ellipsis.length
  const cut = str.slice(0, limit)
  const nextIsBoundary = /\s/.test(str.charAt(limit))
  const lastSpace = cut.search(/\s\S*$/)
  const base = nextIsBoundary || lastSpace <= 0 ? cut : cut.slice(0, lastSpace)
  return base.trimEnd() + ellipsis
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
