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
  const limit = Math.max(0, maxLength - 3)
  let cut = str.slice(0, limit)
  if (limit < str.length && !/\s/.test(str[limit])) {
    const idx = cut.search(/\s\S*$/)
    if (idx > 0) cut = cut.slice(0, idx)
  }
  return cut.trimEnd() + "..."
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
