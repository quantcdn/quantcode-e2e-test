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
  const ellipsis = "..."
  if (str.length <= maxLength) return str
  if (maxLength <= ellipsis.length) return str.slice(0, maxLength)

  const budget = maxLength - ellipsis.length
  let cut = str.slice(0, budget)
  const lastSpace = cut.lastIndexOf(" ")
  if (lastSpace > 0 && str.charAt(budget) !== " ") {
    cut = cut.slice(0, lastSpace)
  }
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
