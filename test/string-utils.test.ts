import { describe, test, expect } from "bun:test";
import {
  capitalize,
  reverse,
  truncate,
  slugify,
  wordCount,
} from "../src/string-utils";

describe("capitalize", () => {
  test("capitalizes first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  test("empty string returns empty", () => {
    expect(capitalize("")).toBe("");
  });

  test("already capitalized unchanged", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });
});

describe("reverse", () => {
  test("reverses a string", () => {
    expect(reverse("abc")).toBe("cba");
  });

  test("empty string", () => {
    expect(reverse("")).toBe("");
  });
});

describe("truncate", () => {
  test("string shorter than maxLength returned unchanged", () => {
    expect(truncate("Hello", 10)).toBe("Hello");
  });

  test("string exactly maxLength returned unchanged", () => {
    expect(truncate("Hello", 5)).toBe("Hello");
  });

  test("longer string gets truncated with ...", () => {
    expect(truncate("Hello world foo bar", 14)).toBe("Hello world...");
  });

  test("breaks at word boundary not mid-word", () => {
    // "Hello world..." is 14 chars > maxLength 12, so breaks at "Hello" instead
    expect(truncate("Hello world foo", 12)).toBe("Hello...");
  });

  test("no space before cut falls back to hard cut", () => {
    expect(truncate("Helloworld", 8)).toBe("Hello...");
  });

  test("single long word truncated at maxLength - 3", () => {
    expect(truncate("abcdefghij", 6)).toBe("abc...");
  });

  test("result length equals maxLength when word boundary aligns", () => {
    const result = truncate("Hello world foo bar", 14);
    expect(result.length).toBeLessThanOrEqual(14);
  });

  test("no truncation needed returns original", () => {
    expect(truncate("Hello world", 20)).toBe("Hello world");
  });
});

describe("slugify", () => {
  test("lowercases and replaces spaces with hyphens", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  test("strips leading/trailing hyphens", () => {
    expect(slugify("  hello  ")).toBe("hello");
  });

  test("collapses multiple non-alphanumeric chars", () => {
    expect(slugify("foo & bar")).toBe("foo-bar");
  });
});

describe("wordCount", () => {
  test("counts words", () => {
    expect(wordCount("hello world")).toBe(2);
  });

  test("empty string returns 0", () => {
    expect(wordCount("")).toBe(0);
  });

  test("whitespace-only returns 0", () => {
    expect(wordCount("   ")).toBe(0);
  });
});
