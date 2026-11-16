/**
 * Input validation utilities.
 */

/**
 * Returns true if the string is a valid email address.
 *
 * BUG: the regex does not allow subdomains (e.g. user@mail.example.com fails)
 * and rejects valid TLDs longer than 4 chars (e.g. .museum, .travel).
 */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value)
}

/**
 * Returns true if the string is a valid URL (http or https).
 *
 * BUG: rejects URLs with ports (e.g. http://localhost:3000)
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
