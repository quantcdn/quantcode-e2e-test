import { describe, test, expect } from "bun:test"
import { isEmail, isUrl, isUsername, isAustralianPhone } from "../src/validator"

describe("validator", () => {
  describe("isEmail", () => {
    test("valid simple email", () => {
      expect(isEmail("user@example.com")).toBe(true)
    })
    test("valid subdomain email", () => {
      expect(isEmail("user@mail.example.com")).toBe(true)
    })
    test("valid long TLD", () => {
      expect(isEmail("user@example.museum")).toBe(true)
    })
    test("rejects missing @", () => {
      expect(isEmail("notanemail")).toBe(false)
    })
    test("rejects spaces", () => {
      expect(isEmail("user @example.com")).toBe(false)
    })
  })

  describe("isUrl", () => {
    test("valid http URL", () => {
      expect(isUrl("http://example.com")).toBe(true)
    })
    test("valid https URL", () => {
      expect(isUrl("https://example.com/path?q=1")).toBe(true)
    })
    test("valid URL with port", () => {
      expect(isUrl("http://localhost:3000")).toBe(true)
    })
    test("rejects ftp", () => {
      expect(isUrl("ftp://example.com")).toBe(false)
    })
    test("rejects plain string", () => {
      expect(isUrl("not a url")).toBe(false)
    })
  })

  describe("isUsername", () => {
    test("valid username", () => {
      expect(isUsername("alice_99")).toBe(true)
    })
    test("rejects starting with number", () => {
      expect(isUsername("1alice")).toBe(false)
    })
    test("rejects too short", () => {
      expect(isUsername("ab")).toBe(false)
    })
    test("rejects too long", () => {
      expect(isUsername("a".repeat(21))).toBe(false)
    })
  })

  describe("isAustralianPhone", () => {
    test("mobile number", () => {
      expect(isAustralianPhone("0412 345 678")).toBe(true)
    })
    test("landline with area code", () => {
      expect(isAustralianPhone("(02) 9876 5432")).toBe(true)
    })
    test("international format", () => {
      expect(isAustralianPhone("+61412345678")).toBe(true)
    })
    test("rejects non-AU number", () => {
      expect(isAustralianPhone("+1 555 123 4567")).toBe(false)
    })
  })
})
