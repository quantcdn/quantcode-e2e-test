import { describe, test, expect } from "bun:test"
import { add, subtract, multiply, divide } from "../src/calculator"

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

  describe("divide", () => {
    test("divides two numbers", () => {
      expect(divide(10, 2)).toBe(5)
    })

    test("returns a float", () => {
      expect(divide(7, 2)).toBe(3.5)
    })

    test("throws on division by zero", () => {
      expect(() => divide(5, 0)).toThrow("Division by zero")
    })
  })
})
