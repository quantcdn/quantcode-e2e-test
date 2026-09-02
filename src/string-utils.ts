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
 * Truncate a string to at most maxLength characters, cutting at a word
 * boundary and appending an ellipsis. The ellipsis counts toward maxLength,
 * so the result is never longer than maxLength.
 */
export function truncate(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str

  const ellipsis = "..."
  if (maxLength <= ellipsis.length) return str.slice(0, Math.max(maxLength, 0))

  // Leading whitespace would otherwise eat the character budget and could
  // reduce the result to a bare ellipsis. Trim it here rather than at entry so
  // a within-limit string is still returned byte-for-byte unchanged above.
  const source = str.trimStart()
  if (source.length <= maxLength) return source

  const budget = maxLength - ellipsis.length
  const candidate = source.slice(0, budget)
  const lastSpace = candidate.lastIndexOf(" ")
  // `source` starts with a non-whitespace character, so `candidate` does too:
  // whichever branch is taken, the body keeps that character and survives
  // trimEnd() non-empty. Content can therefore never be lost entirely.
  const body = lastSpace > 0 ? candidate.slice(0, lastSpace) : candidate

  return body.trimEnd() + ellipsis
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
