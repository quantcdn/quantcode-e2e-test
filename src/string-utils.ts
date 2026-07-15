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

// TODO: implement truncate — should truncate at a word boundary, with "..."
// counting toward maxLength. Return unchanged if str.length <= maxLength.
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  const budget = maxLength - 3
  const words = str.trim().split(/\s+/)
  let accumulated = ""
  for (const word of words) {
    const candidate = accumulated ? accumulated + " " + word : word
    if (candidate.length <= budget) {
      accumulated = candidate
    } else {
      break
    }
  }
  return accumulated + "..."
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
