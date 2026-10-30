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
  const ellipsis = "..."
  if (maxLength <= ellipsis.length) return ellipsis.slice(0, Math.max(0, maxLength))
  const budget = maxLength - ellipsis.length
  const slice = str.slice(0, budget)
  const nextIsBoundary = /\s/.test(str.charAt(budget))
  const lastSpace = slice.search(/\s\S*$/)
  const cut = nextIsBoundary || lastSpace <= 0 ? slice : slice.slice(0, lastSpace)
  return cut.trimEnd() + ellipsis
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
