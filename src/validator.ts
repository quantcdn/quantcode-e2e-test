/**
 * Input validation utilities.
 */

// Allowlist pattern: local part, one or more dot-separated domain labels,
// then an alphabetic TLD of two or more characters (.com, .museum, .travel).
const EMAIL_PATTERN =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/

// RFC 5321 maximum forward-path length; also bounds regex work on hostile input.
const EMAIL_MAX_LENGTH = 254

/**
 * Returns true if the string is a valid email address.
 * Supports subdomains (user@mail.example.com) and long TLDs (.museum, .travel).
 */
export function isEmail(value: string): boolean {
  if (value.length > EMAIL_MAX_LENGTH) return false
  return EMAIL_PATTERN.test(value)
}

/**
 * Returns true if the string is a valid URL using the http or https scheme.
 * Ports are permitted (e.g. http://localhost:3000).
 */
export function isUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

/**
 * Returns true if the string contains only alphanumeric characters and underscores,
 * starts with a letter, and is between minLen and maxLen characters.
 */
export function isUsername(value: string, minLen = 3, maxLen = 20): boolean {
  if (value.length < minLen || value.length > maxLen) return false
  return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(value)
}

/**
 * Returns true if the string is a valid Australian phone number.
 * Accepts formats: 04XX XXX XXX, +614XX XXX XXX, (02) XXXX XXXX, 02 XXXX XXXX
 */
export function isAustralianPhone(value: string): boolean {
  const cleaned = value.replace(/[\s\-().]/g, "")
  return /^(\+?61|0)[2-578]\d{8}$/.test(cleaned)
}
