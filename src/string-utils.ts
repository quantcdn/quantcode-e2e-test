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
  const ellipsis = "..."
  if (maxLength <= ellipsis.length) return ellipsis.slice(0, Math.max(0, maxLength))
  const available = maxLength - ellipsis.length
  let cut = str.slice(0, available)
  if (!/\s/.test(str.charAt(available))) {
    const lastSpace = cut.search(/\s\S*$/)
    if (lastSpace > 0) cut = cut.slice(0, lastSpace)
  }
  return cut.trimEnd() + ellipsis
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
