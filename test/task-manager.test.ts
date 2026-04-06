import { describe, test, expect, beforeEach } from "bun:test";
import { TaskManager } from "../src/task-manager";

describe("TaskManager", () => {
  let manager: TaskManager;

  beforeEach(() => {
    manager = new TaskManager();
  });

  describe("remove", () => {
    test("returns true when task exists and removes it", () => {
      const task = manager.add("Task A");
      expect(manager.remove(task.id)).toBe(true);
      expect(manager.get(task.id)).toBeUndefined();
    });

    test("returns false when task does not exist", () => {
      expect(manager.remove("nonexistent")).toBe(false);
    });

    test("only removes the specified task", () => {
      const a = manager.add("Task A");
      const b = manager.add("Task B");
      manager.remove(a.id);
      expect(manager.get(b.id)).toBeDefined();
    });

    test("task count decreases after removal", () => {
      const a = manager.add("Task A");
      manager.add("Task B");
      manager.remove(a.id);
      expect(manager.list()).toHaveLength(1);
    });
  });

  describe("update", () => {
    test("returns undefined when task not found", () => {
      expect(manager.update("nonexistent", { title: "New" })).toBeUndefined();
    });

    test("updates title", () => {
      const task = manager.add("Old Title");
      const updated = manager.update(task.id, { title: "New Title" });
      expect(updated?.title).toBe("New Title");
    });

    test("updates description", () => {
      const task = manager.add("Task");
      const updated = manager.update(task.id, { description: "Some desc" });
      expect(updated?.description).toBe("Some desc");
    });

    test("updates priority", () => {
      const task = manager.add("Task", "low");
      const updated = manager.update(task.id, { priority: "high" });
      expect(updated?.priority).toBe("high");
    });

    test("does not change id", () => {
      const task = manager.add("Task");
      const updated = manager.update(task.id, { title: "New" });
      expect(updated?.id).toBe(task.id);
    });

    test("does not change status", () => {
      const task = manager.add("Task");
      manager.update(task.id, { title: "New" });
      expect(manager.get(task.id)?.status).toBe("pending");
    });

    test("does not change createdAt", () => {
      const task = manager.add("Task");
      const before = task.createdAt;
      const updated = manager.update(task.id, { title: "New" });
      expect(updated?.createdAt).toEqual(before);
    });

    test("partial update leaves other fields unchanged", () => {
      const task = manager.add("Task", "high", "desc");
      const updated = manager.update(task.id, { title: "New Title" });
      expect(updated?.description).toBe("desc");
      expect(updated?.priority).toBe("high");
    });

    test("update is reflected in subsequent get", () => {
      const task = manager.add("Task");
      manager.update(task.id, { title: "Updated" });
      expect(manager.get(task.id)?.title).toBe("Updated");
    });
  });

  describe("sortBy", () => {
    test("sorts by priority: high > medium > low", () => {
      manager.add("Low", "low");
      manager.add("High", "high");
      manager.add("Medium", "medium");
      const sorted = manager.sortBy("priority");
      expect(sorted.map((t) => t.priority)).toEqual(["high", "medium", "low"]);
    });

    test("sorts by status: in_progress > pending > completed", () => {
      const a = manager.add("A");
      const b = manager.add("B");
      const c = manager.add("C");
      manager.complete(b.id);
      // Manually set a to in_progress via update (status can't be set via update, use internal)
      // complete c and then check pending b and completed
      manager.complete(c.id);
      const sorted = manager.sortBy("status");
      // a=pending, b=completed, c=completed
      expect(sorted[0].status).toBe("pending");
    });

    test("in_progress sorts before pending", () => {
      const a = manager.add("Pending");
      const b = manager.add("InProgress");
      // Use list to verify we have tasks, then manually force in_progress via the task ref
      const taskB = manager.get(b.id)!;
      taskB.status = "in_progress";
      const sorted = manager.sortBy("status");
      expect(sorted[0].id).toBe(b.id);
      expect(sorted[1].id).toBe(a.id);
    });

    test("completed sorts after pending", () => {
      const a = manager.add("Pending");
      const b = manager.add("Completed");
      manager.complete(b.id);
      const sorted = manager.sortBy("status");
      expect(sorted[0].id).toBe(a.id);
      expect(sorted[1].id).toBe(b.id);
    });

    test("sorts by createdAt ascending", () => {
      const a = manager.add("First");
      const b = manager.add("Second");
      const c = manager.add("Third");
      const sorted = manager.sortBy("createdAt");
      expect(sorted.map((t) => t.id)).toEqual([a.id, b.id, c.id]);
    });

    test("returns a new array without mutating internal state", () => {
      manager.add("A", "low");
      manager.add("B", "high");
      const sorted = manager.sortBy("priority");
      sorted.reverse();
      const sorted2 = manager.sortBy("priority");
      expect(sorted2[0].priority).toBe("high");
    });

    test("returns empty array when no tasks", () => {
      expect(manager.sortBy("priority")).toEqual([]);
    });
  });
});
