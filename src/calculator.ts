/**
 * Simple calculator module.
 * Used for testing QuantCode autonomous agent capabilities.
 */

export function add(a: number, b: number): number {
  return a + b
}

export function subtract(a: number, b: number): number {
  return a - b
}

export function multiply(a: number, b: number): number {
  return a * b
}

// BUG: Division by zero is not handled
export function divide(a: number, b: number): number {
  return a / b
}
