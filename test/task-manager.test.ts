import { describe, test, expect, beforeEach } from "bun:test";
import { TaskManager } from "../src/task-manager";

describe("TaskManager", () => {
  let mgr: TaskManager;

  beforeEach(() => {
    mgr = new TaskManager();
  });

  describe("remove", () => {
    test("returns true and removes an existing task", () => {
      const task = mgr.add("Fix bug", "high");
      expect(mgr.remove(task.id)).toBe(true);
      expect(mgr.list()).toHaveLength(0);
    });

    test("returns false for a non-existent id", () => {
      expect(mgr.remove("no-such-id")).toBe(false);
    });

    test("only removes the targeted task", () => {
      const a = mgr.add("Task A");
      const b = mgr.add("Task B");
      mgr.remove(a.id);
      const remaining = mgr.list();
      expect(remaining).toHaveLength(1);
      expect(remaining[0].id).toBe(b.id);
    });

    test("returns false when removing an already-removed task", () => {
      const task = mgr.add("Once");
      mgr.remove(task.id);
      expect(mgr.remove(task.id)).toBe(false);
    });
  });

  describe("update", () => {
    test("updates title", () => {
      const task = mgr.add("Old title");
      const updated = mgr.update(task.id, { title: "New title" });
      expect(updated?.title).toBe("New title");
    });

    test("updates description", () => {
      const task = mgr.add("Task");
      const updated = mgr.update(task.id, { description: "Some details" });
      expect(updated?.description).toBe("Some details");
    });

    test("updates priority", () => {
      const task = mgr.add("Task", "low");
      const updated = mgr.update(task.id, { priority: "high" });
      expect(updated?.priority).toBe("high");
    });

    test("updates multiple fields at once", () => {
      const task = mgr.add("Old", "low", "Old desc");
      const updated = mgr.update(task.id, {
        title: "New",
        description: "New desc",
        priority: "medium",
      });
      expect(updated?.title).toBe("New");
      expect(updated?.description).toBe("New desc");
      expect(updated?.priority).toBe("medium");
    });

    test("returns undefined for a non-existent id", () => {
      expect(mgr.update("ghost", { title: "X" })).toBeUndefined();
    });

    test("does not change id", () => {
      const task = mgr.add("Task");
      const original = task.id;
      mgr.update(task.id, { title: "New" });
      expect(task.id).toBe(original);
    });

    test("does not change status", () => {
      const task = mgr.add("Task");
      mgr.complete(task.id);
      // @ts-expect-error — intentionally passing forbidden field
      mgr.update(task.id, { status: "pending" });
      expect(mgr.list()[0].status).toBe("completed");
    });

    test("does not change createdAt", () => {
      const task = mgr.add("Task");
      const original = task.createdAt.getTime();
      // @ts-expect-error
      mgr.update(task.id, { createdAt: new Date(0) });
      expect(task.createdAt.getTime()).toBe(original);
    });

    test("returned task is the same reference stored internally", () => {
      const task = mgr.add("Task");
      const updated = mgr.update(task.id, { title: "Changed" });
      expect(mgr.list()[0].title).toBe("Changed");
      expect(updated).toBe(mgr.list()[0]);
    });
  });

  describe("sortBy", () => {
    test("sorts by priority: high > medium > low", () => {
      mgr.add("Low task", "low");
      mgr.add("High task", "high");
      mgr.add("Medium task", "medium");
      const sorted = mgr.sortBy("priority");
      expect(sorted.map((t) => t.priority)).toEqual(["high", "medium", "low"]);
    });

    test("sorts by status: in_progress > pending > completed", () => {
      const a = mgr.add("Pending task");
      const b = mgr.add("Completed task");
      const c = mgr.add("In-progress task");
      mgr.complete(b.id);
      // set c to in_progress by updating via internal get
      const cTask = mgr.get(c.id)!;
      cTask.status = "in_progress";
      const sorted = mgr.sortBy("status");
      expect(sorted.map((t) => t.status)).toEqual([
        "in_progress",
        "pending",
        "completed",
      ]);
    });

    test("sorts by createdAt ascending", () => {
      const a = mgr.add("First");
      const b = mgr.add("Second");
      const c = mgr.add("Third");
      const sorted = mgr.sortBy("createdAt");
      expect(sorted.map((t) => t.id)).toEqual([a.id, b.id, c.id]);
    });

    test("does not mutate internal state", () => {
      mgr.add("Low", "low");
      mgr.add("High", "high");
      const before = mgr.list().map((t) => t.id);
      mgr.sortBy("priority");
      expect(mgr.list().map((t) => t.id)).toEqual(before);
    });

    test("returns a new array", () => {
      mgr.add("Task");
      const sorted = mgr.sortBy("priority");
      expect(sorted).not.toBe(mgr.list());
    });

    test("returns empty array when no tasks", () => {
      expect(mgr.sortBy("priority")).toEqual([]);
    });

    test("handles single task", () => {
      const task = mgr.add("Only");
      expect(mgr.sortBy("status")).toEqual([task]);
    });
  });
});
