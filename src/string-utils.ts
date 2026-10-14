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

/**
 * Truncate a string at a word boundary, appending "..." when shortened.
 * The ellipsis counts toward maxLength. Returns the string unchanged if it
 * already fits within maxLength.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str

  const ellipsis = "..."
  const available = maxLength - ellipsis.length
  if (available <= 0) return ellipsis.slice(0, Math.max(maxLength, 0))

  let candidate = str.slice(0, available)
  if (!/\s/.test(str.charAt(available))) {
    const boundary = candidate.search(/\s+\S*$/)
    if (boundary > 0) candidate = candidate.slice(0, boundary)
  }
  return candidate.trimEnd() + ellipsis
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function wordCount(str: string): number {
  const trimmed = str.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}
