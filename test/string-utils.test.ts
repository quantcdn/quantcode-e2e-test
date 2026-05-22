import { describe, test, expect } from "bun:test"
import { capitalize, reverse, slugify, wordCount, truncate } from "../src/string-utils"

describe("string-utils", () => {
  describe("capitalize", () => {
    test("capitalizes first letter", () => {
      expect(capitalize("hello")).toBe("Hello")
    })
    test("handles empty string", () => {
      expect(capitalize("")).toBe("")
    })
  })

  describe("reverse", () => {
    test("reverses a string", () => {
      expect(reverse("hello")).toBe("olleh")
    })
  })

  describe("slugify", () => {
    test("converts to slug", () => {
      expect(slugify("Hello World")).toBe("hello-world")
    })
    test("strips leading/trailing hyphens", () => {
      expect(slugify("  hello  ")).toBe("hello")
    })
  })

  describe("wordCount", () => {
    test("counts words", () => {
      expect(wordCount("hello world")).toBe(2)
    })
    test("handles multiple consecutive spaces", () => {
      expect(wordCount("hello  world")).toBe(2)
    })
    test("handles empty string", () => {
      expect(wordCount("")).toBe(0)
    })
    test("handles whitespace-only string", () => {
      expect(wordCount("   ")).toBe(0)
    })
  })

  describe("truncate", () => {
    test("returns string unchanged if within limit", () => {
      expect(truncate("hello", 10)).toBe("hello")
    })
    test("truncates at word boundary", () => {
      expect(truncate("hello world foo", 11)).toBe("hello...")
    })
    test("ellipsis counts toward maxLength", () => {
      // "hello..." is 8 chars — fits in maxLength 8
      expect(truncate("hello world", 8).length).toBeLessThanOrEqual(8)
    })
    test("handles string shorter than ellipsis", () => {
      expect(truncate("hi", 5)).toBe("hi")
    })
  })
})
