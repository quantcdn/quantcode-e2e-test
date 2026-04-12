import { describe, test, expect, beforeEach } from "bun:test"
import { TaskManager } from "../src/task-manager"

describe("TaskManager", () => {
  let tm: TaskManager

  beforeEach(() => {
    tm = new TaskManager()
  })

  // ── remove ────────────────────────────────────────────────────────────────

  describe("remove", () => {
    test("returns true and removes an existing task", () => {
      const task = tm.add("Task A")
      expect(tm.remove(task.id)).toBe(true)
      expect(tm.get(task.id)).toBeUndefined()
    })

    test("returns false for a non-existent id", () => {
      expect(tm.remove("999")).toBe(false)
    })

    test("task is no longer in list after removal", () => {
      const task = tm.add("Task B")
      tm.remove(task.id)
      expect(tm.list().find((t) => t.id === task.id)).toBeUndefined()
    })

    test("removing one task does not affect others", () => {
      const a = tm.add("A")
      const b = tm.add("B")
      tm.remove(a.id)
      expect(tm.get(b.id)).toBeDefined()
    })
  })

  // ── update ────────────────────────────────────────────────────────────────

  describe("update", () => {
    test("updates title", () => {
      const task = tm.add("Original")
      const updated = tm.update(task.id, { title: "Updated" })
      expect(updated?.title).toBe("Updated")
    })

    test("updates description", () => {
      const task = tm.add("Task", "medium", "old desc")
      const updated = tm.update(task.id, { description: "new desc" })
      expect(updated?.description).toBe("new desc")
    })

    test("updates priority", () => {
      const task = tm.add("Task", "low")
      const updated = tm.update(task.id, { priority: "high" })
      expect(updated?.priority).toBe("high")
    })

    test("updates multiple fields at once", () => {
      const task = tm.add("Old title", "low", "old desc")
      const updated = tm.update(task.id, { title: "New title", priority: "high", description: "new desc" })
      expect(updated?.title).toBe("New title")
      expect(updated?.priority).toBe("high")
      expect(updated?.description).toBe("new desc")
    })

    test("returns undefined for non-existent id", () => {
      expect(tm.update("999", { title: "X" })).toBeUndefined()
    })

    test("does not change id", () => {
      const task = tm.add("Task")
      const originalId = task.id
      tm.update(task.id, { title: "New" })
      expect(tm.get(originalId)?.id).toBe(originalId)
    })

    test("does not change status", () => {
      const task = tm.add("Task")
      tm.complete(task.id)
      tm.update(task.id, { title: "New" })
      expect(tm.get(task.id)?.status).toBe("completed")
    })

    test("does not change createdAt", () => {
      const task = tm.add("Task")
      const originalCreatedAt = task.createdAt
      tm.update(task.id, { title: "New" })
      expect(tm.get(task.id)?.createdAt).toEqual(originalCreatedAt)
    })

    test("does not change completedAt", () => {
      const task = tm.add("Task")
      tm.complete(task.id)
      const completedAt = tm.get(task.id)!.completedAt
      tm.update(task.id, { title: "New" })
      expect(tm.get(task.id)?.completedAt).toEqual(completedAt)
    })

    test("returns the updated task object", () => {
      const task = tm.add("Task")
      const result = tm.update(task.id, { title: "Updated" })
      expect(result).toBeDefined()
      expect(result?.title).toBe("Updated")
    })
  })

  // ── sortBy ────────────────────────────────────────────────────────────────

  describe("sortBy", () => {
    test("sorts by priority: high first, then medium, then low", () => {
      tm.add("Low task", "low")
      tm.add("High task", "high")
      tm.add("Medium task", "medium")

      const sorted = tm.sortBy("priority")
      expect(sorted[0].priority).toBe("high")
      expect(sorted[1].priority).toBe("medium")
      expect(sorted[2].priority).toBe("low")
    })

    test("sorts by status: in_progress first, then pending, then completed", () => {
      const t1 = tm.add("Pending task")
      const t2 = tm.add("Completed task")
      const t3 = tm.add("In-progress task")
      tm.complete(t2.id)
      // manually set in_progress
      const task3 = tm.get(t3.id)!
      task3.status = "in_progress"

      const sorted = tm.sortBy("status")
      expect(sorted[0].status).toBe("in_progress")
      expect(sorted[1].status).toBe("pending")
      expect(sorted[2].status).toBe("completed")
    })

    test("sorts by createdAt ascending (earliest first)", async () => {
      const t1 = tm.add("First")
      await new Promise((r) => setTimeout(r, 5))
      const t2 = tm.add("Second")
      await new Promise((r) => setTimeout(r, 5))
      const t3 = tm.add("Third")

      const sorted = tm.sortBy("createdAt")
      expect(sorted[0].id).toBe(t1.id)
      expect(sorted[1].id).toBe(t2.id)
      expect(sorted[2].id).toBe(t3.id)
    })

    test("returns a new array (does not mutate internal state)", () => {
      tm.add("Low", "low")
      tm.add("High", "high")

      const before = tm.list()
      const sorted = tm.sortBy("priority")

      // sorted is a different array reference
      expect(sorted).not.toBe(before)
      // internal list order is unchanged
      expect(tm.list()[0].priority).toBe("low")
    })

    test("returns all tasks when sorting", () => {
      tm.add("A", "high")
      tm.add("B", "medium")
      tm.add("C", "low")
      expect(tm.sortBy("priority")).toHaveLength(3)
    })
  })
})
