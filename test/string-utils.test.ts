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
    test("leaves already-capitalized string unchanged", () => {
      expect(capitalize("Hello")).toBe("Hello")
    })
    test("only changes the first character", () => {
      expect(capitalize("hELLO")).toBe("HELLO")
    })
    test("handles single character", () => {
      expect(capitalize("a")).toBe("A")
    })
    test("leaves non-letter first character unchanged", () => {
      expect(capitalize("1abc")).toBe("1abc")
    })
  })

  describe("reverse", () => {
    test("reverses a string", () => {
      expect(reverse("hello")).toBe("olleh")
    })
    test("handles empty string", () => {
      expect(reverse("")).toBe("")
    })
    test("handles single character", () => {
      expect(reverse("a")).toBe("a")
    })
    test("palindrome is unchanged", () => {
      expect(reverse("racecar")).toBe("racecar")
    })
    test("preserves spaces and punctuation", () => {
      expect(reverse("a b!")).toBe("!b a")
    })
  })

  describe("slugify", () => {
    test("converts to slug", () => {
      expect(slugify("Hello World")).toBe("hello-world")
    })
    test("strips leading/trailing hyphens", () => {
      expect(slugify("  hello  ")).toBe("hello")
    })
    test("collapses runs of special characters into one hyphen", () => {
      expect(slugify("Hello,   World!!")).toBe("hello-world")
    })
    test("handles empty string", () => {
      expect(slugify("")).toBe("")
    })
    test("returns empty string when no alphanumerics", () => {
      expect(slugify("!!!")).toBe("")
    })
    test("keeps digits", () => {
      expect(slugify("Top 10 Tips")).toBe("top-10-tips")
    })
  })

  describe("wordCount", () => {
    test("counts words", () => {
      expect(wordCount("hello world")).toBe(2)
    })
    test("splits on tabs and newlines", () => {
      expect(wordCount("a\tb\nc")).toBe(3)
    })
    test("counts a single word", () => {
      expect(wordCount("hello")).toBe(1)
    })
    test("ignores leading and trailing single space", () => {
      expect(wordCount(" hello world ")).toBe(2)
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
      expect(truncate("hello world", 8)).toBe("hello...")
    })
    test("handles string shorter than ellipsis", () => {
      expect(truncate("hi", 5)).toBe("hi")
    })
    test("returns string unchanged at exactly maxLength", () => {
      expect(truncate("hello", 5)).toBe("hello")
    })
    test("hard-cuts a single long word", () => {
      expect(truncate("abcdefghij", 8)).toBe("abcde...")
    })
    test("result never exceeds maxLength", () => {
      const input = "the quick brown fox jumps over the lazy dog"
      for (let n = 0; n <= 30; n++) {
        expect(truncate(input, n).length).toBeLessThanOrEqual(n)
      }
    })
    test("maxLength 1 yields truncated ellipsis", () => {
      expect(truncate("hello", 1)).toBe(".")
    })
    test("maxLength 2 yields truncated ellipsis", () => {
      expect(truncate("hello", 2)).toBe("..")
    })
    test("maxLength 3 yields just the ellipsis", () => {
      expect(truncate("hello", 3)).toBe("...")
    })
    test("falls back to hard cut when leading whitespace leaves empty word cut", () => {
      expect(truncate("  hello world", 8)).toBe("  hel...")
    })
    test("handles empty string", () => {
      expect(truncate("", 5)).toBe("")
    })
  })
})
