/**
 * Input validation utilities.
 */

// Allowlist: RFC 5322 dot-atom local part, one or more DNS labels, and a
// 2-63 char alphabetic TLD (covers .com through .museum / .travel).
const EMAIL_RE =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/

/**
 * Returns true if the string is a valid email address.
 * Supports subdomains and long TLDs. Enforces the RFC 5321 254-char limit.
 */
export function isEmail(value: string): boolean {
  if (typeof value !== "string" || value.length === 0 || value.length > 254) return false
  return EMAIL_RE.test(value)
}

/**
 * Returns true if the string is a valid URL (http or https).
 * Ports are permitted (e.g. http://localhost:3000). Any other scheme —
 * including ftp:, file: and javascript: — is rejected.
 */
export function isUrl(value: string): boolean {
  if (typeof value !== "string") return false
  try {
    const url = new URL(value)
    if (url.protocol !== "http:" && url.protocol !== "https:") return false
    if (!url.hostname) return false
    if (url.port !== "") {
      const port = Number(url.port)
      if (!Number.isInteger(port) || port < 1 || port > 65535) return false
    }
    return true
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
