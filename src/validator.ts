/**
 * Input validation utilities.
 */

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value)
}

export function isUrl(value: string): boolean {
  return /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(value)
}

export function isUsername(value: string): boolean {
  return /^[a-zA-Z_][a-zA-Z0-9_]{2,19}$/.test(value)
}

export function isAustralianPhone(value: string): boolean {
  const stripped = value.replace(/[\s().+-]/g, "")
  return /^(61|0)[2-9]\d{8}$/.test(stripped)
}