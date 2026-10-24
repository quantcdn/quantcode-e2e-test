/**
 * Input validation utilities.
 */

/** Maximum total length of an email address (RFC 5321). */
const EMAIL_MAX_LENGTH = 254
/** Maximum length of a single DNS label (RFC 1035). */
const DNS_LABEL_MAX_LENGTH = 63

const EMAIL_LOCAL_PART = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*$/
const DNS_LABEL = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/
const TLD = /^[a-zA-Z]{2,}$/

/**
 * Returns true if the string is a valid email address.
 *
 * Supports subdomains (user@mail.example.com) and TLDs of any length
 * (user@example.museum). Uses a character allowlist rather than a denylist.
 *
 * Validation is split on "@" and applied per domain label so that every
 * pattern runs in linear time — avoids catastrophic backtracking (ReDoS)
 * on untrusted input.
 */
export function isEmail(value: string): boolean {
  if (value.length > EMAIL_MAX_LENGTH) return false

  const at = value.lastIndexOf("@")
  if (at <= 0 || at === value.length - 1) return false

  const local = value.slice(0, at)
  const domain = value.slice(at + 1)

  if (local.includes("@") || !EMAIL_LOCAL_PART.test(local)) return false

  const labels = domain.split(".")
  if (labels.length < 2) return false
  if (!TLD.test(labels[labels.length - 1]!)) return false

  return labels.every((label) => label.length <= DNS_LABEL_MAX_LENGTH && DNS_LABEL.test(label))
}

/**
 * Returns true if the string is a valid URL using the http or https scheme.
 * Ports are permitted (e.g. http://localhost:3000).
 */
export function isUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return (url.protocol === "http:" || url.protocol === "https:") && url.hostname !== ""
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
