import { describe, test, expect } from "bun:test"
import { formatRelative, isSameDay, addDays } from "../src/date-utils"

describe("date-utils", () => {
  const base = new Date("2024-06-15T12:00:00Z")

  describe("formatRelative", () => {
    test("just now for < 60s", () => {
      const d = new Date(base.getTime() - 30_000)
      expect(formatRelative(d, base)).toBe("just now")
    })

    test("minutes ago", () => {
      const d = new Date(base.getTime() - 5 * 60_000)
      expect(formatRelative(d, base)).toBe("5 minutes ago")
    })

    test("1 minute ago (singular)", () => {
      const d = new Date(base.getTime() - 61_000)
      expect(formatRelative(d, base)).toBe("1 minute ago")
    })

    test("hours ago", () => {
      const d = new Date(base.getTime() - 3 * 3600_000)
      expect(formatRelative(d, base)).toBe("3 hours ago")
    })

    test("1 day ago at exactly 36 hours", () => {
      // 36 hours ago should be "2 days ago" with Math.round, "1 day ago" with Math.floor
      const d = new Date(base.getTime() - 36 * 3600_000)
      expect(formatRelative(d, base)).toBe("2 days ago")
    })

    test("2 days ago", () => {
      const d = new Date(base.getTime() - 2 * 86400_000)
      expect(formatRelative(d, base)).toBe("2 days ago")
    })

    test("in the future", () => {
      const d = new Date(base.getTime() + 2 * 3600_000)
      expect(formatRelative(d, base)).toBe("in 2 hours")
    })
  })

  describe("isSameDay", () => {
    test("same day returns true", () => {
      expect(isSameDay(new Date("2024-06-15T09:00:00"), new Date("2024-06-15T23:59:59"))).toBe(true)
    })
    test("different day returns false", () => {
      expect(isSameDay(new Date("2024-06-15"), new Date("2024-06-16"))).toBe(false)
    })
  })

  describe("addDays", () => {
    test("adds days", () => {
      const result = addDays(new Date("2024-06-15"), 3)
      expect(result.getDate()).toBe(18)
    })
    test("does not mutate original", () => {
      const d = new Date("2024-06-15")
      addDays(d, 5)
      expect(d.getDate()).toBe(15)
    })
  })
})
