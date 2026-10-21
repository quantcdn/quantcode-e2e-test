import { describe, test, expect, beforeEach } from "bun:test"
import { TaskManager } from "../src/task-manager"

describe("TaskManager — sprint board workflow", () => {
  let mgr: TaskManager

  beforeEach(() => {
    mgr = new TaskManager()
  })

  test("triages a sprint board and narrows by status and priority together", () => {
    const outage = mgr.add("Fix prod outage", "high")
    const audit = mgr.add("Rotate signing keys", "high")
    mgr.add("Tidy changelog", "low")
    const docs = mgr.add("Draft release notes", "medium")

    mgr.complete(audit.id)
    mgr.complete(docs.id)

    const pendingHigh = mgr.list({ status: "pending", priority: "high" })
    expect(pendingHigh).toHaveLength(1)
    expect(pendingHigh[0].id).toBe(outage.id)

    const completedHigh = mgr.list({ status: "completed", priority: "high" })
    expect(completedHigh).toHaveLength(1)
    expect(completedHigh[0].id).toBe(audit.id)

    expect(mgr.list({ status: "completed", priority: "low" })).toHaveLength(0)
    expect(mgr.list({ status: "in_progress", priority: "high" })).toHaveLength(0)

    expect(mgr.list({ priority: "high" })).toHaveLength(2)
    expect(mgr.list({ status: "completed" })).toHaveLength(2)
    expect(mgr.list()).toHaveLength(4)
  })

  test("carries description and default priority through the lifecycle", () => {
    const t = mgr.add("Patch dependency", "high", "Bump transitive lib to a fixed release")
    expect(t.description).toBe("Bump transitive lib to a fixed release")
    expect(t.priority).toBe("high")

    const defaulted = mgr.add("Unspecified importance")
    expect(defaulted.priority).toBe("medium")
    expect(defaulted.description).toBeUndefined()

    mgr.complete(t.id)
    const stored = mgr.get(t.id)
    expect(stored?.description).toBe("Bump transitive lib to a fixed release")
    expect(stored?.priority).toBe("high")
    expect(stored?.status).toBe("completed")

    expect(mgr.list({ priority: "medium" })).toHaveLength(1)
    expect(mgr.list({ priority: "medium" })[0].id).toBe(defaulted.id)
  })

  test("records completion metadata only once the task is completed", () => {
    const t = mgr.add("Ship audit log export")
    expect(t.status).toBe("pending")
    expect(mgr.get(t.id)?.completedAt).toBeUndefined()

    const before = Date.now()
    expect(mgr.complete(t.id)).toBe(true)

    const completed = mgr.get(t.id)
    expect(completed?.status).toBe("completed")
    expect(completed?.completedAt).toBeInstanceOf(Date)
    expect(completed?.completedAt?.getTime()).toBeGreaterThanOrEqual(before)
    expect(completed?.completedAt?.getTime()).toBeGreaterThanOrEqual(
      completed?.createdAt.getTime() ?? 0,
    )

    const untouched = mgr.add("Not started yet")
    expect(mgr.get(untouched.id)?.completedAt).toBeUndefined()
  })

  test("list returns a fresh array so array mutations do not affect the board", () => {
    const kept = mgr.add("Keep me", "high")
    mgr.add("Keep me too", "low")

    const first = mgr.list()
    expect(first).toHaveLength(2)

    first.pop()
    first.push({
      id: "injected",
      title: "Injected task",
      priority: "high",
      status: "pending",
      createdAt: new Date(),
    })

    expect(mgr.list()).toHaveLength(2)
    expect(mgr.list().map((t) => t.id)).toContain(kept.id)

    const filtered = mgr.list({ priority: "high" })
    filtered.length = 0
    expect(mgr.list({ priority: "high" })).toHaveLength(1)
  })
})
