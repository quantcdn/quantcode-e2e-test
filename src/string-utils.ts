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
  if (maxLength <= 0) return ""
  if (str.length <= maxLength) return str
  const ellipsis = "..."
  if (maxLength <= ellipsis.length) return ellipsis.slice(0, maxLength)
  const head = str.slice(0, maxLength - ellipsis.length)
  const lastSpace = head.lastIndexOf(" ")
  const cut = lastSpace > 0 ? head.slice(0, lastSpace) : head
  const trimmed = cut.trimEnd()
  return (trimmed || head) + ellipsis
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
