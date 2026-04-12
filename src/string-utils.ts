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
  if (maxLength <= 3) return ".".repeat(maxLength)

  // We need to fit text + "..." within maxLength
  const available = maxLength - 3
  const candidate = str.slice(0, available)

  // If the character right after the cut is a space or we're at end, clean word boundary
  if (str[available] === " " || available >= str.length) {
    return candidate + "..."
  }

  // Find last space in candidate to avoid cutting mid-word
  const lastSpace = candidate.lastIndexOf(" ")
  if (lastSpace === -1) {
    // No space found — truncate at character level
    return candidate + "..."
  }

  return candidate.slice(0, lastSpace) + "..."
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
