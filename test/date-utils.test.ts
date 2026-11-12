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

    test("rounds 36 hours up to 2 days ago", () => {
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

  describe("formatRelative extras", () => {
    test("just now for identical dates", () => {
      expect(formatRelative(base, base)).toBe("just now")
    })
    test("just now for small future offset", () => {
      expect(formatRelative(new Date(base.getTime() + 30_000), base)).toBe("just now")
    })
    test("in N minutes (future)", () => {
      expect(formatRelative(new Date(base.getTime() + 5 * 60_000), base)).toBe("in 5 minutes")
    })
    test("in 1 minute (singular, future)", () => {
      expect(formatRelative(new Date(base.getTime() + 61_000), base)).toBe("in 1 minute")
    })
    test("1 hour ago (singular)", () => {
      expect(formatRelative(new Date(base.getTime() - 3600_000), base)).toBe("1 hour ago")
    })
    test("in 1 hour (singular, future)", () => {
      expect(formatRelative(new Date(base.getTime() + 3600_000), base)).toBe("in 1 hour")
    })
    test("1 day ago at exactly 24 hours", () => {
      expect(formatRelative(new Date(base.getTime() - 86400_000), base)).toBe("1 day ago")
    })
    test("in 2 days (future)", () => {
      expect(formatRelative(new Date(base.getTime() + 2 * 86400_000), base)).toBe("in 2 days")
    })
    test("defaults now to current time", () => {
      expect(formatRelative(new Date())).toBe("just now")
    })
  })

  describe("isSameDay", () => {
    test("same day returns true", () => {
      expect(isSameDay(new Date("2024-06-15T09:00:00"), new Date("2024-06-15T23:59:59"))).toBe(true)
    })
    test("different day returns false", () => {
      expect(isSameDay(new Date(2024, 5, 15), new Date(2024, 5, 16))).toBe(false)
    })
  })

  describe("isSameDay extras", () => {
    test("same day-of-month in different months is false", () => {
      expect(isSameDay(new Date(2024, 5, 15), new Date(2024, 6, 15))).toBe(false)
    })
    test("same day-of-month in different years is false", () => {
      expect(isSameDay(new Date(2024, 5, 15), new Date(2025, 5, 15))).toBe(false)
    })
    test("midnight boundary is a different day", () => {
      expect(isSameDay(new Date(2024, 5, 15, 23, 59, 59), new Date(2024, 5, 16, 0, 0, 0))).toBe(false)
    })
    test("a date is the same day as itself", () => {
      const d = new Date(2024, 5, 15)
      expect(isSameDay(d, d)).toBe(true)
    })
  })

  describe("addDays", () => {
    test("adds days", () => {
      const result = addDays(new Date(2024, 5, 15), 3)
      expect(result.getDate()).toBe(18)
    })
    test("does not mutate original", () => {
      const d = new Date(2024, 5, 15)
      addDays(d, 5)
      expect(d.getDate()).toBe(15)
    })
    test("subtracts days with negative value", () => {
      expect(addDays(new Date(2024, 5, 15), -5).getDate()).toBe(10)
    })
    test("zero days returns equal date as a new object", () => {
      const d = new Date(2024, 5, 15)
      const r = addDays(d, 0)
      expect(r.getTime()).toBe(d.getTime())
      expect(r).not.toBe(d)
    })
    test("rolls over month boundary", () => {
      const r = addDays(new Date(2024, 0, 30), 3)
      expect(r.getMonth()).toBe(1)
      expect(r.getDate()).toBe(2)
    })
    test("rolls over year boundary", () => {
      const r = addDays(new Date(2024, 11, 30), 3)
      expect(r.getFullYear()).toBe(2025)
      expect(r.getMonth()).toBe(0)
      expect(r.getDate()).toBe(2)
    })
    test("handles leap day", () => {
      const r = addDays(new Date(2024, 1, 28), 1)
      expect(r.getMonth()).toBe(1)
      expect(r.getDate()).toBe(29)
    })
  })
})
