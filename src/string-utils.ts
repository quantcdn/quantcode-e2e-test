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
 * Truncate a string to maxLength characters, cutting at a word boundary.
 * The "..." ellipsis counts toward maxLength, so the result never exceeds it.
 * Returns the string unchanged when it already fits.
 *
 * When maxLength is not long enough to fit the ellipsis itself (<= 3), the
 * string is hard-cut to maxLength with no ellipsis, so there is no visible
 * truncation marker. A negative maxLength yields an empty string.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str

  const ellipsis = "..."
  if (maxLength <= ellipsis.length) return str.slice(0, Math.max(0, maxLength))

  const candidate = str.slice(0, maxLength - ellipsis.length)
  const lastSpace = candidate.lastIndexOf(" ")

  // Only honour the word boundary when it retains at least half the available
  // budget. Otherwise a single early space (e.g. "a bcdefghijk") would discard
  // nearly everything, so fall back to a hard character cut.
  const useWordBoundary = lastSpace > 0 && lastSpace >= candidate.length / 2
  const body = useWordBoundary ? candidate.slice(0, lastSpace) : candidate

  return body.trimEnd() + ellipsis
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
