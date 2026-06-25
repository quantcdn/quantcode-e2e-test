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
  const budget = maxLength - 3
  if (budget <= 0) return str.slice(0, maxLength)
  const words = str.split(" ")
  let result = ""
  for (const word of words) {
    const candidate = result ? result + " " + word : word
    if (candidate.length <= budget) {
      result = candidate
    } else {
      break
    }
  }
  return (result || str.slice(0, budget)) + "..."
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
