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
  const budget = maxLength - ellipsis.length
  const words = str.split(/\s+/)
  let result = ""
  for (const word of words) {
    const candidate = result ? result + " " + word : word
    if (candidate.length <= budget) result = candidate
    else break
  }
  return result + ellipsis
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function wordCount(str: string): number {
  if (!str.trim()) return 0
  return str.split(/\s+/).filter(Boolean).length
}
