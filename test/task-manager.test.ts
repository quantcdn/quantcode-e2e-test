import { describe, test, expect, beforeEach } from "bun:test";
import { TaskManager } from "../src/task-manager";

describe("TaskManager", () => {
  let tm: TaskManager;

  beforeEach(() => {
    tm = new TaskManager();
  });

  describe("remove", () => {
    test("returns true when task exists", () => {
      const task = tm.add("Task A");
      expect(tm.remove(task.id)).toBe(true);
    });

    test("returns false when task does not exist", () => {
      expect(tm.remove("999")).toBe(false);
    });

    test("task is gone after removal", () => {
      const task = tm.add("Task A");
      tm.remove(task.id);
      expect(tm.get(task.id)).toBeUndefined();
    });

    test("does not affect other tasks", () => {
      const a = tm.add("Task A");
      const b = tm.add("Task B");
      tm.remove(a.id);
      expect(tm.get(b.id)).toBeDefined();
    });
  });

  describe("update", () => {
    test("updates title", () => {
      const task = tm.add("Old title");
      const updated = tm.update(task.id, { title: "New title" });
      expect(updated?.title).toBe("New title");
    });

    test("updates description", () => {
      const task = tm.add("Task");
      const updated = tm.update(task.id, { description: "A description" });
      expect(updated?.description).toBe("A description");
    });

    test("updates priority", () => {
      const task = tm.add("Task", "low");
      const updated = tm.update(task.id, { priority: "high" });
      expect(updated?.priority).toBe("high");
    });

    test("returns undefined for non-existent id", () => {
      expect(tm.update("999", { title: "X" })).toBeUndefined();
    });

    test("does not change id", () => {
      const task = tm.add("Task");
      const orig = task.id;
      tm.update(task.id, { title: "New" });
      expect(tm.get(orig)?.id).toBe(orig);
    });

    test("does not change status", () => {
      const task = tm.add("Task");
      tm.update(task.id, { title: "New" } as any);
      expect(tm.get(task.id)?.status).toBe("pending");
    });

    test("does not change createdAt", () => {
      const task = tm.add("Task");
      const created = task.createdAt;
      tm.update(task.id, { title: "New" } as any);
      expect(tm.get(task.id)?.createdAt).toEqual(created);
    });

    test("does not change completedAt", () => {
      const task = tm.add("Task");
      tm.complete(task.id);
      const completed = tm.get(task.id)?.completedAt;
      tm.update(task.id, { title: "New" } as any);
      expect(tm.get(task.id)?.completedAt).toEqual(completed);
    });

    test("partial update leaves other fields unchanged", () => {
      const task = tm.add("Task", "high", "desc");
      tm.update(task.id, { title: "New title" });
      const got = tm.get(task.id)!;
      expect(got.priority).toBe("high");
      expect(got.description).toBe("desc");
    });
  });

  describe("sortBy priority", () => {
    test("high before medium before low", () => {
      tm.add("Low", "low");
      tm.add("High", "high");
      tm.add("Medium", "medium");
      const sorted = tm.sortBy("priority");
      expect(sorted.map((t) => t.priority)).toEqual(["high", "medium", "low"]);
    });

    test("returns array with all tasks", () => {
      tm.add("A", "low");
      tm.add("B", "high");
      expect(tm.sortBy("priority").length).toBe(2);
    });
  });

  describe("sortBy status", () => {
    test("in_progress before pending before completed", () => {
      const a = tm.add("Pending");
      const b = tm.add("Completed");
      tm.complete(b.id);
      const c = tm.add("In progress");
      tm.update(c.id, {});
      // manually set status for test
      (tm.get(c.id) as any).status = "in_progress";
      const sorted = tm.sortBy("status");
      expect(sorted.map((t) => t.status)).toEqual([
        "in_progress",
        "pending",
        "completed",
      ]);
    });
  });

  describe("sortBy createdAt", () => {
    test("newest first", async () => {
      const a = tm.add("First");
      await new Promise((r) => setTimeout(r, 5));
      const b = tm.add("Second");
      await new Promise((r) => setTimeout(r, 5));
      const c = tm.add("Third");
      const sorted = tm.sortBy("createdAt");
      expect(sorted[0].id).toBe(c.id);
      expect(sorted[1].id).toBe(b.id);
      expect(sorted[2].id).toBe(a.id);
    });
  });

  describe("sortBy does not mutate internal state", () => {
    test("list() order unchanged after sortBy", () => {
      tm.add("Low", "low");
      tm.add("High", "high");
      tm.add("Medium", "medium");
      const before = tm.list().map((t) => t.id);
      tm.sortBy("priority");
      const after = tm.list().map((t) => t.id);
      expect(after).toEqual(before);
    });
  });
});
