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
  const avail = maxLength - 3
  if (avail <= 0) return "...".slice(0, maxLength)
  const head = str.slice(0, avail + 1)
  const cut = head.lastIndexOf(" ")
  const result = cut > 0 ? str.slice(0, cut) : str.slice(0, avail)
  return result.trimEnd() + "..."
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
