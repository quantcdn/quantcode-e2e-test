import { describe, test, expect } from "bun:test";
import { capitalize, reverse, truncate } from "../src/string-utils";

describe("capitalize", () => {
  test("capitalizes first letter", () =>
    expect(capitalize("hello")).toBe("Hello"));
  test("empty string", () => expect(capitalize("")).toBe(""));
});

describe("reverse", () => {
  test("reverses a string", () => expect(reverse("abc")).toBe("cba"));
});

describe("truncate", () => {
  test("returns string unchanged when within maxLength", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  test("returns string unchanged when exactly maxLength", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });

  test("truncates at word boundary and appends ...", () => {
    expect(truncate("hello world foo", 11)).toBe("hello...");
  });

  test("... counts towards maxLength", () => {
    const result = truncate("one two three", 10);
    expect(result.length).toBeLessThanOrEqual(10);
    expect(result.endsWith("...")).toBe(true);
  });

  test("falls back to hard cut when no space before limit", () => {
    expect(truncate("abcdefghij", 5)).toBe("ab...");
  });

  test("handles string with single long word", () => {
    const result = truncate("superlongword", 8);
    expect(result).toBe("super...");
    expect(result.length).toBe(8);
  });

  test("handles maxLength of 3 (just the ellipsis)", () => {
    expect(truncate("hi there", 3)).toBe("...");
  });

  test("does not break mid-word when space is available", () => {
    const result = truncate("the quick brown fox", 15);
    expect(result.endsWith("...")).toBe(true);
    // the truncated portion before "..." must not end mid-word
    const prefix = result.slice(0, -3);
    expect(prefix).toBe(prefix.trimEnd());
  });

  test("empty string returns empty string", () => {
    expect(truncate("", 5)).toBe("");
  });
});
