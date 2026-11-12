/**
 * Simple calculator module.
 * Used for testing QuantCode autonomous agent capabilities.
 */

/**
 * Add two numbers.
 *
 * @param a - The first addend.
 * @param b - The second addend.
 * @returns The sum of `a` and `b`.
 */
export function add(a: number, b: number): number {
  return a + b
}

/**
 * Subtract one number from another.
 *
 * @param a - The minuend.
 * @param b - The subtrahend.
 * @returns The difference `a - b`.
 */
export function subtract(a: number, b: number): number {
  return a - b
}

/**
 * Multiply two numbers.
 *
 * @param a - The first factor.
 * @param b - The second factor.
 * @returns The product of `a` and `b`.
 */
export function multiply(a: number, b: number): number {
  return a * b
}

// BUG: Division by zero is not handled
/**
 * Divide one number by another.
 *
 * Division by zero is not guarded: it follows IEEE 754 and returns
 * `Infinity`, `-Infinity` or `NaN` rather than throwing.
 *
 * @param a - The dividend.
 * @param b - The divisor.
 * @returns The quotient `a / b`.
 */
export function divide(a: number, b: number): number {
  return a / b
}
