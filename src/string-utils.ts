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
  if (budget <= 0) return ELLIPSIS.slice(0, Math.max(0, maxLength))

  const head = str.slice(0, budget)

  // If the next character is whitespace, head already ends on a word boundary.
  const splitsWord = !/\s/.test(str.charAt(budget))
  const lastSpace = head.search(/\s+\S*$/)
  const cut = splitsWord && lastSpace > 0 ? head.slice(0, lastSpace) : head

  return cut.trimEnd() + ELLIPSIS
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
