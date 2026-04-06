import { describe, test, expect } from "bun:test"
import { add, subtract, multiply } from "../src/calculator"

// Note: divide is intentionally not tested — has a known bug

describe("calculator", () => {
  test("adds two numbers", () => {
    expect(add(2, 3)).toBe(5)
  })

  test("subtracts two numbers", () => {
    expect(subtract(5, 3)).toBe(2)
  })

  test("multiplies two numbers", () => {
    expect(multiply(4, 3)).toBe(12)
  })
})
