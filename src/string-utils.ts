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
  if (maxLength <= ellipsis.length) return str.slice(0, maxLength)
  const budget = maxLength - ellipsis.length
  const cut = str.slice(0, budget)
  const lastSpace = cut.lastIndexOf(" ")
  const trimmed = lastSpace > 0 ? cut.slice(0, lastSpace) : lastSpace === 0 ? cut.slice(1) : cut
  return trimmed + ellipsis
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
