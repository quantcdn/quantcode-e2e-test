import { describe, test, expect } from "bun:test"
import { truncate } from "../src/string-utils"

describe("truncate", () => {
  test("returns string unchanged when shorter than maxLength", () => {
    expect(truncate("hello", 10)).toBe("hello")
  })

  test("returns string unchanged when exactly equal to maxLength", () => {
    expect(truncate("hello", 5)).toBe("hello")
  })

  test("truncates at word boundary, not mid-word", () => {
    // "Hello world" (11 chars), maxLength=8 → available=5 → "Hello" + "..." = "Hello..."
    expect(truncate("Hello world", 8)).toBe("Hello...")
  })

  test("appended '...' counts toward maxLength", () => {
    const result = truncate("Hello world foo", 8)
    expect(result.length).toBeLessThanOrEqual(8)
    expect(result.endsWith("...")).toBe(true)
  })

  test("truncates a longer sentence at word boundary", () => {
    // "The quick brown fox" maxLength=13 → available=10 → "The quick " → last space at 9
    // "The quick" + "..." = "The quick..." (12 chars ≤ 13)
    const result = truncate("The quick brown fox", 13)
    expect(result).toBe("The quick...")
    expect(result.length).toBeLessThanOrEqual(13)
  })

  test("edge case: maxLength=0 returns empty string", () => {
    expect(truncate("hello", 0)).toBe("")
  })

  test("edge case: maxLength=1 returns '.'", () => {
    expect(truncate("hello", 1)).toBe(".")
  })

  test("edge case: maxLength=2 returns '..'", () => {
    expect(truncate("hello", 2)).toBe("..")
  })

  test("edge case: maxLength=3 returns '...'", () => {
    expect(truncate("hello world", 3)).toBe("...")
  })

  test("no spaces before cut point — truncates at character level", () => {
    // "superlongword" maxLength=8 → available=5 → "super" no space → "super..."
    expect(truncate("superlongword", 8)).toBe("super...")
  })

  test("empty string returns empty string", () => {
    expect(truncate("", 10)).toBe("")
  })

  test("empty string with maxLength=0 returns empty string", () => {
    expect(truncate("", 0)).toBe("")
  })

  test("does not leave trailing space before '...'", () => {
    // "Hello world" maxLength=9 → available=6 → "Hello " → last space at 5 → "Hello" + "..."
    const result = truncate("Hello world", 9)
    expect(result).not.toMatch(/ \.\.\./)
    expect(result.endsWith("...")).toBe(true)
  })

  test("word at exact boundary — no truncation needed", () => {
    // "Hi there" = 8 chars, maxLength=8 → unchanged
    expect(truncate("Hi there", 8)).toBe("Hi there")
  })
})
