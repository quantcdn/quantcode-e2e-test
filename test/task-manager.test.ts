import { describe, test, expect, beforeEach } from "bun:test"
import { TaskManager } from "../src/task-manager"
import type { Task } from "../src/task-manager"

describe("TaskManager", () => {
  let tm: TaskManager

  beforeEach(() => {
    tm = new TaskManager()
  })

  // ── add ──────────────────────────────────────────────────────────────────

  describe("add", () => {
    test("creates a task with the given title", () => {
      const task = tm.add("Write tests")
      expect(task.title).toBe("Write tests")
    })

    test("defaults priority to medium", () => {
      const task = tm.add("Write tests")
      expect(task.priority).toBe("medium")
    })

    test("accepts an explicit priority", () => {
      const task = tm.add("Urgent fix", "high")
      expect(task.priority).toBe("high")
    })

    test("accepts an optional description", () => {
      const task = tm.add("Write tests", "low", "All edge cases")
      expect(task.description).toBe("All edge cases")
    })

    test("description is undefined when not provided", () => {
      const task = tm.add("Write tests")
      expect(task.description).toBeUndefined()
    })

    test("assigns unique sequential IDs", () => {
      const a = tm.add("A")
      const b = tm.add("B")
      expect(a.id).not.toBe(b.id)
    })

    test("new task has status pending", () => {
      const task = tm.add("A")
      expect(task.status).toBe("pending")
    })

    test("new task has a createdAt date", () => {
      const task = tm.add("A")
      expect(task.createdAt).toBeInstanceOf(Date)
    })

    test("new task has no completedAt", () => {
      const task = tm.add("A")
      expect(task.completedAt).toBeUndefined()
    })
  })

  // ── get ──────────────────────────────────────────────────────────────────

  describe("get", () => {
    test("returns the task by ID", () => {
      const task = tm.add("A")
      expect(tm.get(task.id)).toBe(task)
    })

    test("returns undefined for unknown ID", () => {
      expect(tm.get("999")).toBeUndefined()
    })
  })

  // ── list ─────────────────────────────────────────────────────────────────

  describe("list", () => {
    test("returns all tasks when no filter is given", () => {
      tm.add("A")
      tm.add("B")
      expect(tm.list()).toHaveLength(2)
    })

    test("returns empty array when no tasks exist", () => {
      expect(tm.list()).toHaveLength(0)
    })

    test("filters by status", () => {
      const a = tm.add("A")
      tm.add("B")
      tm.complete(a.id)
      expect(tm.list({ status: "completed" })).toHaveLength(1)
      expect(tm.list({ status: "pending" })).toHaveLength(1)
    })

    test("filters by priority", () => {
      tm.add("A", "high")
      tm.add("B", "low")
      tm.add("C", "high")
      expect(tm.list({ priority: "high" })).toHaveLength(2)
      expect(tm.list({ priority: "low" })).toHaveLength(1)
      expect(tm.list({ priority: "medium" })).toHaveLength(0)
    })

    test("filters by both status and priority", () => {
      const a = tm.add("A", "high")
      tm.add("B", "high")
      tm.complete(a.id)
      const result = tm.list({ status: "completed", priority: "high" })
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(a.id)
    })
  })

  // ── complete ─────────────────────────────────────────────────────────────

  describe("complete", () => {
    test("marks a task as completed", () => {
      const task = tm.add("A")
      tm.complete(task.id)
      expect(tm.get(task.id)!.status).toBe("completed")
    })

    test("sets completedAt", () => {
      const task = tm.add("A")
      tm.complete(task.id)
      expect(tm.get(task.id)!.completedAt).toBeInstanceOf(Date)
    })

    test("returns true on success", () => {
      const task = tm.add("A")
      expect(tm.complete(task.id)).toBe(true)
    })

    test("returns false for unknown ID", () => {
      expect(tm.complete("999")).toBe(false)
    })
  })

  // ── remove ───────────────────────────────────────────────────────────────

  describe("remove", () => {
    test("removes a task by ID", () => {
      const task = tm.add("A")
      tm.remove(task.id)
      expect(tm.get(task.id)).toBeUndefined()
    })

    test("returns true when task is removed", () => {
      const task = tm.add("A")
      expect(tm.remove(task.id)).toBe(true)
    })

    test("returns false for unknown ID", () => {
      expect(tm.remove("999")).toBe(false)
    })

    test("removed task no longer appears in list", () => {
      const a = tm.add("A")
      tm.add("B")
      tm.remove(a.id)
      expect(tm.list()).toHaveLength(1)
      expect(tm.list()[0].title).toBe("B")
    })

    test("removing one task does not affect others", () => {
      const a = tm.add("A")
      const b = tm.add("B")
      tm.remove(a.id)
      expect(tm.get(b.id)).toBeDefined()
    })
  })

  // ── update ───────────────────────────────────────────────────────────────

  describe("update", () => {
    test("updates the title", () => {
      const task = tm.add("Old title")
      tm.update(task.id, { title: "New title" })
      expect(tm.get(task.id)!.title).toBe("New title")
    })

    test("updates the description", () => {
      const task = tm.add("A", "medium", "old desc")
      tm.update(task.id, { description: "new desc" })
      expect(tm.get(task.id)!.description).toBe("new desc")
    })

    test("updates the priority", () => {
      const task = tm.add("A", "low")
      tm.update(task.id, { priority: "high" })
      expect(tm.get(task.id)!.priority).toBe("high")
    })

    test("returns the updated task", () => {
      const task = tm.add("A")
      const updated = tm.update(task.id, { title: "B" })
      expect(updated).toBeDefined()
      expect(updated!.title).toBe("B")
    })

    test("returns undefined for unknown ID", () => {
      expect(tm.update("999", { title: "X" })).toBeUndefined()
    })

    test("partial update does not change unspecified fields", () => {
      const task = tm.add("A", "high", "desc")
      tm.update(task.id, { title: "B" })
      const updated = tm.get(task.id)!
      expect(updated.priority).toBe("high")
      expect(updated.description).toBe("desc")
    })

    test("can update multiple fields at once", () => {
      const task = tm.add("A", "low")
      tm.update(task.id, { title: "B", priority: "high" })
      const updated = tm.get(task.id)!
      expect(updated.title).toBe("B")
      expect(updated.priority).toBe("high")
    })

    test("does not change status or createdAt", () => {
      const task = tm.add("A")
      const originalCreatedAt = task.createdAt
      tm.update(task.id, { title: "B" })
      const updated = tm.get(task.id)!
      expect(updated.status).toBe("pending")
      expect(updated.createdAt).toBe(originalCreatedAt)
    })

    test("empty object leaves task unchanged", () => {
      const task = tm.add("A", "high", "desc")
      const updated = tm.update(task.id, {})
      expect(updated!.title).toBe("A")
      expect(updated!.priority).toBe("high")
      expect(updated!.description).toBe("desc")
    })

    test("passing description: undefined does NOT clear an existing description", () => {
      // Current behavior: the `!== undefined` guard means undefined values are ignored.
      // To clear a description, callers must use a separate mechanism (not yet implemented).
      const task = tm.add("A", "medium", "existing desc")
      tm.update(task.id, { description: undefined })
      expect(tm.get(task.id)!.description).toBe("existing desc")
    })
  })

  // ── sortBy ───────────────────────────────────────────────────────────────

  describe("sortBy", () => {
    describe("priority", () => {
      test("orders high before medium before low", () => {
        tm.add("Low", "low")
        tm.add("High", "high")
        tm.add("Medium", "medium")
        const sorted = tm.sortBy("priority")
        expect(sorted[0].priority).toBe("high")
        expect(sorted[1].priority).toBe("medium")
        expect(sorted[2].priority).toBe("low")
      })

      test("tasks with same priority retain relative order", () => {
        tm.add("A", "high")
        tm.add("B", "high")
        const sorted = tm.sortBy("priority")
        expect(sorted[0].title).toBe("A")
        expect(sorted[1].title).toBe("B")
      })
    })

    describe("createdAt", () => {
      test("orders newest first", async () => {
        const a = tm.add("A")
        // Ensure distinct timestamps by advancing the date manually
        const b = tm.add("B")
        b.createdAt = new Date(a.createdAt.getTime() + 1000)
        const c = tm.add("C")
        c.createdAt = new Date(a.createdAt.getTime() + 2000)

        const sorted = tm.sortBy("createdAt")
        expect(sorted[0].title).toBe("C")
        expect(sorted[1].title).toBe("B")
        expect(sorted[2].title).toBe("A")
      })
    })

    describe("status", () => {
      test("orders pending before in_progress before completed", () => {
        const a = tm.add("A")
        const b = tm.add("B")
        const c = tm.add("C")
        tm.complete(a.id)
        b.status = "in_progress"
        // c remains pending

        const sorted = tm.sortBy("status")
        expect(sorted[0].status).toBe("pending")
        expect(sorted[1].status).toBe("in_progress")
        expect(sorted[2].status).toBe("completed")
      })
    })

    test("returns empty array when no tasks exist", () => {
      expect(tm.sortBy("priority")).toHaveLength(0)
    })

    test("does not mutate the internal task order", () => {
      tm.add("Low", "low")
      tm.add("High", "high")
      tm.sortBy("priority")
      // list() should still return in insertion order
      const listed = tm.list()
      expect(listed[0].priority).toBe("low")
      expect(listed[1].priority).toBe("high")
    })
  })
})
