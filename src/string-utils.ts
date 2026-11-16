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
  const budget = Math.max(0, maxLength - ellipsis.length)
  const slice = str.slice(0, budget)
  const nextIsSpace = /\s/.test(str.charAt(budget))
  const lastSpace = slice.search(/\s\S*$/)
  const cut = nextIsSpace || lastSpace <= 0 ? slice : slice.slice(0, lastSpace)
  return (cut.trimEnd() + ellipsis).slice(0, maxLength)
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
