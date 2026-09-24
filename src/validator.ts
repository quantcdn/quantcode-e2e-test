/**
 * Input validation utilities.
 */

/**
 * Returns true if the string is a valid email address.
 *
 * The local part is matched permissively (dot-separated segments of any
 * character except whitespace, "@" and control characters) so internationalised
 * addresses such as josé@example.com are accepted. The domain is matched
 * strictly: dot-separated LDH labels and a 2–63 character alphabetic TLD,
 * which supports subdomains and long TLDs (.museum, .travel).
 */
export function isEmail(value: string): boolean {
  if (value.length > 254) return false
  const localPart = String.raw`[^\s@.\x00-\x1F\x7F]+(?:\.[^\s@.\x00-\x1F\x7F]+)*`
  const domain = String.raw`(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,63}`
  return new RegExp(`^${localPart}@${domain}$`, "u").test(value)
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
