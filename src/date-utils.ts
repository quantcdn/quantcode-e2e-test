/**
 * Date utility functions.
 */

/**
 * Format a date as a human-readable relative string.
 * e.g. "2 days ago", "just now", "in 3 hours"
 */
export function formatRelative(date: Date, now: Date = new Date()): string {
  const diffMs = now.getTime() - date.getTime()
  const diffSec = diffMs / 1000
  const diffMin = diffSec / 60
  const diffHours = diffMin / 60

  if (Math.abs(diffSec) < 60) return "just now"
  if (Math.abs(diffMin) < 60) {
    const m = Math.round(Math.abs(diffMin))
    return diffMs > 0 ? `${m} minute${m !== 1 ? "s" : ""} ago` : `in ${m} minute${m !== 1 ? "s" : ""}`
  }
  if (Math.abs(diffHours) < 24) {
    const h = Math.round(Math.abs(diffHours))
    return diffMs > 0 ? `${h} hour${h !== 1 ? "s" : ""} ago` : `in ${h} hour${h !== 1 ? "s" : ""}`
  }
  const d = Math.round(Math.abs(diffHours / 24))
  return diffMs > 0 ? `${d} day${d !== 1 ? "s" : ""} ago` : `in ${d} day${d !== 1 ? "s" : ""}`
}

/**
 * Returns true if two dates fall on the same calendar day.
 */
export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

/**
 * Add a number of days to a date (returns a new Date).
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}
