/**
 * Date utility functions.
 */

export function formatRelative(date: Date, now: Date = new Date()): string {
  const diffMs = now.getTime() - date.getTime()
  const absDiffMs = Math.abs(diffMs)
  const future = diffMs < 0

  const diffSeconds = Math.round(absDiffMs / 1000)
  const diffMinutes = Math.round(absDiffMs / (1000 * 60))
  const diffHours = Math.round(absDiffMs / (1000 * 60 * 60))
  const diffDays = Math.round(absDiffMs / (1000 * 60 * 60 * 24))

  if (diffSeconds < 60) return "just now"

  if (future) {
    if (diffMinutes < 60) return `in ${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""}`
    if (diffHours < 24) return `in ${diffHours} hour${diffHours !== 1 ? "s" : ""}`
    return `in ${diffDays} day${diffDays !== 1 ? "s" : ""}`
  }

  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
  return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}