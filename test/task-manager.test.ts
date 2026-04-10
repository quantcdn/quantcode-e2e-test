import { describe, test, expect, beforeEach } from "bun:test"
import { TaskManager } from "../src/task-manager"
import type { Task } from "../src/task-manager"

describe("TaskManager", () => {
  let tm: TaskManager

  beforeEach(() => {
    tm = new TaskManager()
  })

  // ── add / get / list / complete (existing) ──────────────────────────────

  describe("add", () => {
    test("creates a task with defaults", () => {
      const task = tm.add("Buy milk")
      expect(task.title).toBe("Buy milk")
      expect(task.priority).toBe("medium")
      expect(task.status).toBe("pending")
      expect(task.id).toBe("1")
      expect(task.createdAt).toBeInstanceOf(Date)
      expect(task.completedAt).toBeUndefined()
    })

    test("accepts priority as second arg", () => {
      const task = tm.add("Deploy", "high")
      expect(task.priority).toBe("high")
    })

    test("accepts description as third arg", () => {
      const task = tm.add("Deploy", "high", "Push to prod")
      expect(task.description).toBe("Push to prod")
    })

    test("auto-increments IDs", () => {
      const a = tm.add("A")
      const b = tm.add("B")
      expect(b.id).toBe(String(Number(a.id) + 1))
    })
  })

  describe("get", () => {
    test("returns the task by ID", () => {
      const task = tm.add("Task")
      expect(tm.get(task.id)).toBe(task)
    })

    test("returns undefined for unknown ID", () => {
      expect(tm.get("999")).toBeUndefined()
    })
  })

  describe("list", () => {
    test("returns empty array when no tasks", () => {
      expect(tm.list()).toEqual([])
    })

    test("returns all tasks with no filter", () => {
      tm.add("A")
      tm.add("B")
      expect(tm.list()).toHaveLength(2)
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
      expect(tm.list({ priority: "high" })).toHaveLength(1)
    })
  })

  describe("complete", () => {
    test("marks task as completed and returns true", () => {
      const task = tm.add("Finish report")
      expect(tm.complete(task.id)).toBe(true)
      expect(tm.get(task.id)?.status).toBe("completed")
      expect(tm.get(task.id)?.completedAt).toBeInstanceOf(Date)
    })

    test("returns false for unknown ID", () => {
      expect(tm.complete("999")).toBe(false)
    })
  })

  // ── remove ──────────────────────────────────────────────────────────────

  describe("remove", () => {
    test("removes an existing task and returns true", () => {
      const task = tm.add("To delete")
      expect(tm.remove(task.id)).toBe(true)
      expect(tm.get(task.id)).toBeUndefined()
      expect(tm.list()).toHaveLength(0)
    })

    test("returns false for unknown ID", () => {
      expect(tm.remove("999")).toBe(false)
    })

    test("does not affect other tasks", () => {
      const a = tm.add("A")
      const b = tm.add("B")
      tm.remove(a.id)
      expect(tm.list()).toHaveLength(1)
      expect(tm.get(b.id)).toBeDefined()
    })

    test("removed task cannot be retrieved", () => {
      const task = tm.add("Gone")
      tm.remove(task.id)
      expect(tm.get(task.id)).toBeUndefined()
    })
  })

  // ── update ──────────────────────────────────────────────────────────────

  describe("update", () => {
    test("updates title", () => {
      const task = tm.add("Old title")
      const updated = tm.update(task.id, { title: "New title" })
      expect(updated?.title).toBe("New title")
    })

    test("updates description", () => {
      const task = tm.add("Task", "medium", "old desc")
      tm.update(task.id, { description: "new desc" })
      expect(tm.get(task.id)?.description).toBe("new desc")
    })

    test("updates priority", () => {
      const task = tm.add("Task")
      tm.update(task.id, { priority: "low" })
      expect(tm.get(task.id)?.priority).toBe("low")
    })

    test("can update multiple fields at once", () => {
      const task = tm.add("Task", "low")
      const updated = tm.update(task.id, { title: "New", priority: "high" })
      expect(updated?.title).toBe("New")
      expect(updated?.priority).toBe("high")
    })

    test("does not change id, status, or createdAt", () => {
      const task = tm.add("Task")
      const originalId = task.id
      const originalCreatedAt = task.createdAt
      const originalStatus = task.status
      tm.update(task.id, { title: "Changed" })
      const fetched = tm.get(task.id)!
      expect(fetched.id).toBe(originalId)
      expect(fetched.status).toBe(originalStatus)
      expect(fetched.createdAt).toBe(originalCreatedAt)
    })

    test("returns undefined for unknown ID", () => {
      expect(tm.update("999", { title: "X" })).toBeUndefined()
    })

    test("returns the updated task object", () => {
      const task = tm.add("Task")
      const result = tm.update(task.id, { title: "Updated" })
      expect(result).toBeDefined()
      expect(result?.title).toBe("Updated")
    })

    test("partial update leaves other fields unchanged", () => {
      const task = tm.add("Task", "high", "desc")
      tm.update(task.id, { title: "New title" })
      const fetched = tm.get(task.id)!
      expect(fetched.priority).toBe("high")
      expect(fetched.description).toBe("desc")
    })
  })

  // ── sortBy ───────────────────────────────────────────────────────────────

  describe("sortBy", () => {
    test("returns empty array when no tasks", () => {
      expect(tm.sortBy("priority")).toEqual([])
    })

    test("sorts by priority: high > medium > low", () => {
      tm.add("Low task", "low")
      tm.add("High task", "high")
      tm.add("Med task", "medium")
      const sorted = tm.sortBy("priority")
      expect(sorted.map(t => t.priority)).toEqual(["high", "medium", "low"])
    })

    test("sorts by status: in_progress > pending > completed", () => {
      const a = tm.add("Pending")
      const b = tm.add("Will complete")
      const c = tm.add("In progress")
      c.status = "in_progress"
      tm.complete(b.id)
      const sorted = tm.sortBy("status")
      expect(sorted.map(t => t.status)).toEqual(["in_progress", "pending", "completed"])
    })

    test("sorts by createdAt: oldest first", async () => {
      const a = tm.add("First")
      await new Promise(r => setTimeout(r, 5))
      const b = tm.add("Second")
      await new Promise(r => setTimeout(r, 5))
      const c = tm.add("Third")
      const sorted = tm.sortBy("createdAt")
      expect(sorted.map(t => t.id)).toEqual([a.id, b.id, c.id])
    })

    test("does not mutate internal task list order", () => {
      tm.add("Low", "low")
      tm.add("High", "high")
      const before = tm.list().map(t => t.id)
      tm.sortBy("priority")
      const after = tm.list().map(t => t.id)
      expect(after).toEqual(before)
    })

    test("returns a new array (not the internal collection)", () => {
      tm.add("Task")
      const sorted = tm.sortBy("priority")
      sorted.push({} as Task)
      expect(tm.list()).toHaveLength(1)
    })
  })
})