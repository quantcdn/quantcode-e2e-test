import { describe, test, expect } from "bun:test"
import { capitalize, reverse, truncate, slugify, wordCount } from "../src/string-utils"

// ── capitalize ───────────────────────────────────────────────────────────────

describe("capitalize", () => {
  test("capitalizes the first letter", () => {
    expect(capitalize("hello")).toBe("Hello")
  })

  test("leaves already-capitalized strings unchanged", () => {
    expect(capitalize("Hello")).toBe("Hello")
  })

  test("handles single character", () => {
    expect(capitalize("a")).toBe("A")
  })

  test("does not change the rest of the string", () => {
    expect(capitalize("hELLO")).toBe("HELLO")
  })

  test("returns empty string unchanged", () => {
    expect(capitalize("")).toBe("")
  })
})

// ── reverse ──────────────────────────────────────────────────────────────────

describe("reverse", () => {
  test("reverses a simple string", () => {
    expect(reverse("hello")).toBe("olleh")
  })

  test("reverses a single character", () => {
    expect(reverse("a")).toBe("a")
  })

  test("returns empty string unchanged", () => {
    expect(reverse("")).toBe("")
  })

  test("handles palindromes", () => {
    expect(reverse("racecar")).toBe("racecar")
  })

  test("reverses a string with spaces", () => {
    expect(reverse("hello world")).toBe("dlrow olleh")
  })
})

// ── truncate ─────────────────────────────────────────────────────────────────

describe("truncate", () => {
  test("returns string unchanged when shorter than maxLength", () => {
    expect(truncate("hello", 10)).toBe("hello")
  })

  test("returns string unchanged when equal to maxLength", () => {
    expect(truncate("hello", 5)).toBe("hello")
  })

  test("truncates and appends '...'", () => {
    const result = truncate("hello world", 8)
    expect(result.endsWith("...")).toBe(true)
    expect(result.length).toBeLessThanOrEqual(8)
  })

  test("does not cut in the middle of a word", () => {
    // "hello world" — cut at 8 chars (5 usable + "..."), last space before 5 is at index 5
    // "hello" is the last full word that fits
    const result = truncate("hello world", 8)
    expect(result).toBe("hello...")
  })

  test("handles a string with no spaces before the cut point", () => {
    // "superlongword" with maxLength 6 — no space found, hard-cut at 3 chars
    const result = truncate("superlongword", 6)
    expect(result).toBe("sup...")
    expect(result.length).toBeLessThanOrEqual(6)
  })

  test("returns empty string unchanged", () => {
    expect(truncate("", 5)).toBe("")
  })

  test("handles maxLength of exactly 3", () => {
    const result = truncate("hello world", 3)
    expect(result).toBe("...")
  })

  test("handles maxLength less than 3", () => {
    expect(truncate("hello", 2)).toBe("..")
    expect(truncate("hello", 1)).toBe(".")
  })

  test("handles maxLength of 0", () => {
    expect(truncate("hello", 0)).toBe("")
  })

  test("truncates a long sentence at a word boundary", () => {
    const str = "The quick brown fox jumps over the lazy dog"
    const result = truncate(str, 20)
    expect(result.endsWith("...")).toBe(true)
    expect(result.length).toBeLessThanOrEqual(20)
    // Must not end with a partial word before "..."
    const withoutEllipsis = result.slice(0, -3)
    expect(withoutEllipsis).toBe(withoutEllipsis.trimEnd())
  })

  test("multiple words — picks last full word that fits", () => {
    // maxLength 14 → cutAt = 11 → lastIndexOf(" ", 11) = 9 → "The quick" + "..."
    const result = truncate("The quick brown fox", 14)
    expect(result).toBe("The quick...")
  })
})

// ── slugify ──────────────────────────────────────────────────────────────────

describe("slugify", () => {
  test("lowercases the string", () => {
    expect(slugify("Hello World")).toBe("hello-world")
  })

  test("replaces spaces with hyphens", () => {
    expect(slugify("hello world")).toBe("hello-world")
  })

  test("removes leading and trailing hyphens", () => {
    expect(slugify("  hello  ")).toBe("hello")
  })

  test("replaces non-alphanumeric characters", () => {
    expect(slugify("hello, world!")).toBe("hello-world")
  })

  test("collapses multiple separators into one hyphen", () => {
    expect(slugify("hello   world")).toBe("hello-world")
  })

  test("handles empty string", () => {
    expect(slugify("")).toBe("")
  })

  test("handles string with only special characters", () => {
    expect(slugify("!!!")).toBe("")
  })
})

// ── wordCount ────────────────────────────────────────────────────────────────

describe("wordCount", () => {
  test("counts words in a normal sentence", () => {
    expect(wordCount("hello world")).toBe(2)
  })

  test("returns 0 for empty string", () => {
    expect(wordCount("")).toBe(0)
  })

  test("returns 0 for whitespace-only string", () => {
    expect(wordCount("   ")).toBe(0)
  })

  test("counts a single word", () => {
    expect(wordCount("hello")).toBe(1)
  })

  test("handles multiple consecutive spaces (bug fix)", () => {
    expect(wordCount("hello   world")).toBe(2)
  })

  test("handles leading and trailing spaces", () => {
    expect(wordCount("  hello world  ")).toBe(2)
  })

  test("handles tabs and newlines as whitespace", () => {
    expect(wordCount("hello\tworld\nfoo")).toBe(3)
  })
})