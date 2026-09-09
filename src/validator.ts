/**
 * Input validation utilities.
 */

const LOCAL_ATOM = "[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+"
const DOMAIN_LABEL = "[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?"

const EMAIL_RE = new RegExp(
  "^" +
    LOCAL_ATOM +
    "(?:\\." +
    LOCAL_ATOM +
    ")*" +
    "@" +
    DOMAIN_LABEL +
    "(?:\\." +
    DOMAIN_LABEL +
    ")*" +
    "\\.[A-Za-z]{2,63}$",
)

/**
 * Returns true if the string is a syntactically valid email address.
 * Supports subdomains and TLDs of any valid length (e.g. .museum, .travel),
 * and caps length at 254 characters per RFC 5321.
 *
 * Local-part dot placement is validated per RFC 5322: leading, trailing and
 * consecutive dots are rejected. Quoted local parts ("a..b"@example.com) and
 * IP-literal domains (user@[192.0.2.1]) are not supported.
 *
 * NOTE: syntax only — this proves neither deliverability nor that the
 * submitter controls the address. Gate registration and notification flows
 * on a confirmation link. An email address is personal information: collect
 * only where reasonably necessary (APP 3), give a collection notice (APP 5),
 * and secure it in transit and at rest (APP 11).
 */
export function isEmail(value: string): boolean {
  if (value.length > 254) return false
  return EMAIL_RE.test(value)
}

/**
 * Returns true if the string is a syntactically valid http/https URL.
 * Ports are permitted (e.g. http://localhost:3000).
 *
 * SECURITY: this is a syntax and scheme check ONLY — it is not an SSRF
 * control. It deliberately accepts hosts that are unsafe as server-side
 * request targets, including:
 *   - loopback: http://127.0.0.1:22, http://[::1]:8080
 *   - link-local / cloud metadata: http://169.254.169.254/
 *   - private ranges (RFC1918): http://10.0.0.1/
 *   - obfuscated IP literals: http://0177.0.0.1/, http://2130706433/
 *   - userinfo confusion, where the real host is not the visible one:
 *     https://good.com@evil.com
 *
 * Before passing a user-supplied URL to an outbound request or a redirect,
 * the caller must additionally enforce a host allowlist (not a denylist),
 * reject url.username/url.password, normalise IP literals, and re-validate
 * after DNS resolution to close DNS rebinding. See CWE-918, CWE-601,
 * OWASP A10:2021, ISM-1240.
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
