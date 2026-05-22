import { describe, test, expect, beforeEach } from "bun:test"
import { TaskManager } from "../src/task-manager"

describe("TaskManager", () => {
  let mgr: TaskManager

  beforeEach(() => {
    mgr = new TaskManager()
  })

  test("adds a task", () => {
    const t = mgr.add("Write tests")
    expect(t.id).toBeDefined()
    expect(t.title).toBe("Write tests")
    expect(t.status).toBe("pending")
  })

  test("gets a task by id", () => {
    const t = mgr.add("Write tests")
    expect(mgr.get(t.id)).toEqual(t)
  })

  test("lists all tasks", () => {
    mgr.add("Task 1")
    mgr.add("Task 2")
    expect(mgr.list()).toHaveLength(2)
  })

  test("filters by status", () => {
    const t = mgr.add("Task 1")
    mgr.complete(t.id)
    expect(mgr.list({ status: "completed" })).toHaveLength(1)
    expect(mgr.list({ status: "pending" })).toHaveLength(0)
  })

  test("completes a task", () => {
    const t = mgr.add("Task 1")
    expect(mgr.complete(t.id)).toBe(true)
    expect(mgr.get(t.id)?.status).toBe("completed")
    expect(mgr.get(t.id)?.completedAt).toBeDefined()
  })

  test("complete returns false for unknown id", () => {
    expect(mgr.complete("999")).toBe(false)
  })

  test("removes a task", () => {
    const t = mgr.add("Task 1")
    expect(mgr.remove(t.id)).toBe(true)
    expect(mgr.get(t.id)).toBeUndefined()
    expect(mgr.list()).toHaveLength(0)
  })

  test("remove returns false for unknown id", () => {
    expect(mgr.remove("999")).toBe(false)
  })

  test("updates a task title", () => {
    const t = mgr.add("Old title")
    mgr.update(t.id, { title: "New title" })
    expect(mgr.get(t.id)?.title).toBe("New title")
  })

  test("updates a task priority", () => {
    const t = mgr.add("Task", "low")
    mgr.update(t.id, { priority: "high" })
    expect(mgr.get(t.id)?.priority).toBe("high")
  })

  test("update returns false for unknown id", () => {
    expect(mgr.update("999", { title: "x" })).toBe(false)
  })

  test("sortBy priority orders high before medium before low", () => {
    mgr.add("Low", "low")
    mgr.add("High", "high")
    mgr.add("Medium", "medium")
    const sorted = mgr.sortBy("priority")
    expect(sorted[0].priority).toBe("high")
    expect(sorted[1].priority).toBe("medium")
    expect(sorted[2].priority).toBe("low")
  })

  test("sortBy createdAt returns oldest first", () => {
    const t1 = mgr.add("First")
    const t2 = mgr.add("Second")
    const sorted = mgr.sortBy("createdAt")
    expect(sorted[0].id).toBe(t1.id)
    expect(sorted[1].id).toBe(t2.id)
  })
})
