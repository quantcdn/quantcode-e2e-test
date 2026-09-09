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

const ELLIPSIS = "..."

/**
 * Truncate at a word boundary, with ELLIPSIS counting toward maxLength.
 * Returns str unchanged if str.length <= maxLength. The returned string is
 * never longer than maxLength.
 *
 * Note: lengths are UTF-16 code units, so a maxLength that falls inside an
 * astral character cuts before it rather than splitting the surrogate pair.
 */
export function truncate(str: string, maxLength: number): string {
  if (!Number.isFinite(maxLength) || maxLength < 0) {
    throw new RangeError("maxLength must be a non-negative finite number")
  }
  if (str.length <= maxLength) return str
  if (maxLength <= ELLIPSIS.length) return str.slice(0, maxLength)

  const budget = maxLength - ELLIPSIS.length
  const head = str.slice(0, budget)

  if (/\s/.test(str.charAt(budget))) return head.trimEnd() + ELLIPSIS

  const boundary = head.search(/\s+\S*$/)
  if (boundary === -1) return head + ELLIPSIS
  return head.slice(0, boundary) + ELLIPSIS
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
