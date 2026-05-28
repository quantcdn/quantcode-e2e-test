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

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "")
}

export function wordCount(str: string): number {
  if (!str.trim()) return 0
  return str.trim().split(/\s+/).filter(Boolean).length
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  const cutoff = maxLength - 3
  const slice = str.slice(0, cutoff)
  const lastSpace = slice.lastIndexOf(" ")
  if (lastSpace === -1) {
    return slice + "..."
  }
  return slice.slice(0, lastSpace) + "..."
}