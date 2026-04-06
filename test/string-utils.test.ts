import { describe, test, expect } from "bun:test";
import { truncate, capitalize, reverse, slugify } from "../src/string-utils";

describe("truncate", () => {
  test("returns string unchanged when within maxLength", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  test("returns string unchanged when exactly maxLength", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });

  test("truncates long string and adds ellipsis", () => {
    const result = truncate("hello world foo bar", 14);
    expect(result.length).toBeLessThanOrEqual(14);
    expect(result.endsWith("...")).toBe(true);
  });

  test("does not break in the middle of a word", () => {
    const result = truncate("hello world", 9);
    expect(result).toBe("hello...");
  });

  test("ellipsis counts toward maxLength", () => {
    const result = truncate("hello world", 8);
    expect(result.length).toBeLessThanOrEqual(8);
  });

  test("handles string with no spaces", () => {
    const result = truncate("helloworld", 7);
    expect(result).toBe("hell...");
    expect(result.length).toBeLessThanOrEqual(7);
  });

  test("handles empty string", () => {
    expect(truncate("", 5)).toBe("");
  });

  test("breaks at last space before limit", () => {
    const result = truncate("one two three four", 12);
    expect(result).toBe("one two...");
    expect(result.length).toBeLessThanOrEqual(12);
  });
});

describe("capitalize (existing)", () => {
  test("capitalizes first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  test("handles empty string", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("reverse (existing)", () => {
  test("reverses a string", () => {
    expect(reverse("abc")).toBe("cba");
  });
});
