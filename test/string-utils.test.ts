import { describe, test, expect } from "bun:test"
import { capitalize, truncate, reverse } from "../src/string-utils"

describe("capitalize", () => {
  test("capitalizes the first letter", () => {
    expect(capitalize("hello")).toBe("Hello")
  })

  test("preserves the rest of the string as-is", () => {
    expect(capitalize("hELLO")).toBe("HELLO")
  })

  test("returns empty string unchanged", () => {
    expect(capitalize("")).toBe("")
  })

  test("handles single character", () => {
    expect(capitalize("a")).toBe("A")
  })

  test("handles already-capitalized string", () => {
    expect(capitalize("Hello")).toBe("Hello")
  })
})

describe("reverse", () => {
  test("reverses a string", () => {
    expect(reverse("hello")).toBe("olleh")
  })

  test("returns empty string unchanged", () => {
    expect(reverse("")).toBe("")
  })

  test("palindrome stays the same", () => {
    expect(reverse("racecar")).toBe("racecar")
  })
})

describe("truncate", () => {
  test("returns string unchanged when at maxLength", () => {
    expect(truncate("Hello", 5)).toBe("Hello")
  })

  test("returns string unchanged when under maxLength", () => {
    expect(truncate("Hi", 10)).toBe("Hi")
  })

  test("returns empty string unchanged", () => {
    expect(truncate("", 5)).toBe("")
  })

  test("truncates at word boundary and appends '...'", () => {
    // "Hello world foo" maxLength=11 → window is "Hello wo" (8 chars), last space at 5
    // → "Hello" + "..." = "Hello..." (8 chars ≤ 11)
    const result = truncate("Hello world foo", 11)
    expect(result.endsWith("...")).toBe(true)
    expect(result.length).toBeLessThanOrEqual(11)
  })

  test("'...' counts toward maxLength", () => {
    const result = truncate("Hello world", 8)
    expect(result.length).toBeLessThanOrEqual(8)
    expect(result.endsWith("...")).toBe(true)
  })

  test("does not cut in the middle of a word", () => {
    const result = truncate("Hello beautiful world", 14)
    expect(result.endsWith("...")).toBe(true)
    // The text before '...' must be a whole word (or multiple whole words)
    const textPart = result.slice(0, -3)
    // Every token in textPart must appear as a complete word in the original
    const originalWords = "Hello beautiful world".split(" ")
    const resultWords = textPart.split(" ")
    for (const word of resultWords) {
      expect(originalWords).toContain(word)
    }
  })

  test("handles maxLength === 3 (no '...' appended, just hard cut)", () => {
    expect(truncate("Hello", 3)).toBe("Hel")
  })

  test("handles maxLength === 2", () => {
    expect(truncate("Hello", 2)).toBe("He")
  })

  test("handles maxLength === 1", () => {
    expect(truncate("Hello", 1)).toBe("H")
  })

  test("handles maxLength === 0", () => {
    expect(truncate("Hello", 0)).toBe("")
  })

  test("handles a single long word with no spaces", () => {
    // No space to break on — falls back to hard cut at window boundary
    const result = truncate("Superlongword", 8)
    expect(result.endsWith("...")).toBe(true)
    expect(result.length).toBeLessThanOrEqual(8)
  })

  test("handles exact boundary — one char over", () => {
    // "Hello!" length 6, maxLength 5 → window "He" (2 chars), no space → cut at 2 → "He..."
    const result = truncate("Hello!", 5)
    expect(result.endsWith("...")).toBe(true)
    expect(result.length).toBeLessThanOrEqual(5)
  })

  test("preserves full string when length exactly equals maxLength", () => {
    expect(truncate("exact", 5)).toBe("exact")
  })

  test("truncates a realistic sentence", () => {
    const sentence = "The quick brown fox jumps over the lazy dog"
    const result = truncate(sentence, 20)
    expect(result.length).toBeLessThanOrEqual(20)
    expect(result.endsWith("...")).toBe(true)
    // Verify no partial words
    const originalWords = sentence.split(" ")
    const textPart = result.slice(0, -3)
    const resultWords = textPart.split(" ")
    for (const word of resultWords) {
      expect(originalWords).toContain(word)
    }
  })
})