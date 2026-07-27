/**
 * Date utility functions.
 */

/**
 * Format a date as a human-readable relative string.
 * e.g. "2 days ago", "just now", "in 3 hours"
 */
export function formatRelative(date: Date, now: Date = new Date()): string {
  const diffMs = now.getTime() - date.getTime()
  const isPast = diffMs > 0
  const absSec = Math.abs(diffMs) / 1000

  const phrase = (value: number, unit: string): string => {
    const quantity = `${value} ${unit}${value !== 1 ? "s" : ""}`
    return isPast ? `${quantity} ago` : `in ${quantity}`
  }

  if (absSec < 60) return "just now"

  // Round within each unit *before* testing its upper bound, so the displayed
  // number can never overflow its own unit (e.g. "60 minutes ago").
  const minutes = Math.round(absSec / 60)
  if (minutes < 60) return phrase(minutes, "minute")

  const hours = Math.round(absSec / 3600)
  if (hours < 24) return phrase(hours, "hour")

  return phrase(Math.round(absSec / 86400), "day")
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
