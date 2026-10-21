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

/**
 * Truncate a string at a word boundary, appending "...".
 * The ellipsis counts toward maxLength. Returns the string unchanged
 * if it already fits within maxLength.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str

  const ellipsis = "..."
  const budget = maxLength - ellipsis.length
  if (budget <= 0) return str.slice(0, Math.max(0, maxLength))

  let head = str.slice(0, budget)
  if (!/\s/.test(str.charAt(budget))) {
    const lastSpace = head.search(/\s+\S*$/)
    if (lastSpace > 0) head = head.slice(0, lastSpace)
  }

  return head.replace(/\s+$/, "") + ellipsis
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
