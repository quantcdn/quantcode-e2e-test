import { describe, test, expect } from "bun:test";
import { capitalize, reverse, slugify, wordCount } from "../src/string-utils";

describe("capitalize", () => {
  test("capitalizes first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  test("returns empty string unchanged", () => {
    expect(capitalize("")).toBe("");
  });

  test("leaves already-capitalized string unchanged", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });
});

describe("reverse", () => {
  test("reverses a string", () => {
    expect(reverse("hello")).toBe("olleh");
  });

  test("reverses empty string", () => {
    expect(reverse("")).toBe("");
  });

  test("palindrome stays the same", () => {
    expect(reverse("racecar")).toBe("racecar");
  });
});

describe("slugify", () => {
  test("converts spaces to hyphens", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  test("strips leading and trailing hyphens", () => {
    expect(slugify("  hello  ")).toBe("hello");
  });

  test("collapses multiple non-alphanumeric chars", () => {
    expect(slugify("foo & bar")).toBe("foo-bar");
  });
});

describe("wordCount", () => {
  test("counts words in a normal sentence", () => {
    expect(wordCount("hello world")).toBe(2);
  });

  test("handles multiple consecutive spaces", () => {
    expect(wordCount("hello   world")).toBe(2);
  });

  test("returns 0 for empty string", () => {
    expect(wordCount("")).toBe(0);
  });

  test("returns 0 for whitespace-only string", () => {
    expect(wordCount("   ")).toBe(0);
  });

  test("counts a single word", () => {
    expect(wordCount("hello")).toBe(1);
  });
});
