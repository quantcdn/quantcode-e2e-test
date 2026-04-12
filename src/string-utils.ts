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
  if (!str || str.length <= maxLength) return str
  if (maxLength <= 3) return "...".slice(0, maxLength)
  // Find the last space at or before (maxLength - 3) to avoid mid-word cuts
  const cutAt = maxLength - 3
  const lastSpace = str.lastIndexOf(" ", cutAt)
  const end = lastSpace !== -1 ? lastSpace : cutAt
  return str.slice(0, end) + "..."
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
