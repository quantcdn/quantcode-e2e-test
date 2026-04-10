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
  // Edge case: maxLength too small to fit any '...' meaningfully
  if (maxLength <= 3) return str.slice(0, maxLength)
  // Find the last space within the allowed window (maxLength - 3 chars + '...')
  const window = str.slice(0, maxLength - 3)
  const lastSpace = window.lastIndexOf(" ")
  const cut = lastSpace > 0 ? lastSpace : window.length
  return str.slice(0, cut) + "..."
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

// BUG: This doesn't handle multiple consecutive spaces
export function wordCount(str: string): number {
  if (!str.trim()) return 0
  return str.split(" ").length
}
