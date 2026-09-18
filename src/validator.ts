/**
 * Input validation utilities.
 */

const MAX_EMAIL_LENGTH = 254
const LOCAL_PART = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/
const DOMAIN_LABEL = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/
const TLD = /^[A-Za-z]{2,63}$/

/**
 * Returns true if the string is a valid email address.
 *
 * Supports subdomains and TLDs of any valid length. Validated as an allowlist
 * of permitted characters per label rather than a single ambiguous regex, to
 * keep matching linear-time and avoid catastrophic backtracking [ISM-1240].
 */
export function isEmail(value: string): boolean {
  if (typeof value !== "string") return false
  if (value.length === 0 || value.length > MAX_EMAIL_LENGTH) return false

  const at = value.lastIndexOf("@")
  if (at <= 0 || at === value.length - 1) return false

  const local = value.slice(0, at)
  const domain = value.slice(at + 1)

  if (local.length > 64) return false
  if (!LOCAL_PART.test(local)) return false
  if (domain.length > 253) return false

  const labels = domain.split(".")
  if (labels.length < 2) return false
  if (!labels.every((label) => DOMAIN_LABEL.test(label))) return false

  return TLD.test(labels[labels.length - 1]!)
}

/**
 * Returns true if the string is a well-formed URL using the http or https
 * scheme. Ports are permitted (e.g. http://localhost:3000).
 *
 * This checks well-formedness and scheme ONLY. It is NOT an egress or SSRF
 * control and must not be used to decide whether a URL is safe to fetch
 * server-side. It deliberately accepts loopback, link-local, private-range and
 * cloud metadata hosts, including obfuscated encodings that normalise to
 * loopback:
 *
 *   http://localhost:3000            http://169.254.169.254/latest/meta-data/
 *   http://10.0.0.5/                 http://metadata.google.internal/
 *   http://2130706433/               -> hostname 127.0.0.1
 *   http://user:pass@evil.com@internal.host/  -> hostname internal.host
 *
 * If a server-side fetch is ever introduced, add a separate
 * isSafeFetchTarget() that allowlists `url.hostname` after parsing (never the
 * raw string), re-validates every redirect hop, and accounts for DNS
 * rebinding. Do not widen this function to do it [ISM-1240].
 *
 * Note also that validation is performed against the WHATWG-normalised URL, so
 * inputs such as " http://example.com" and "http:/example.com" return true
 * while the caller still holds the un-normalised string. Callers that need the
 * validated form should parse with `new URL(value)` and use `url.href`.
 */
export function isUrl(value: string): boolean {
  if (typeof value !== "string" || value.length === 0) return false
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
