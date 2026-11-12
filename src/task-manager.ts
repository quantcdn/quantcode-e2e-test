/**
 * Simple task manager.
 * Manages a list of tasks with priorities and status tracking.
 */

export type Priority = "low" | "medium" | "high"
export type Status = "pending" | "in_progress" | "completed"

export interface Task {
  id: string
  title: string
  description?: string
  priority: Priority
  status: Status
  createdAt: Date
  completedAt?: Date
}

/**
 * In-memory task manager that stores tasks with priorities and status tracking.
 */
export class TaskManager {
  private tasks: Map<string, Task> = new Map()
  private nextId = 1

  /**
   * Create a new task with status `pending` and store it.
   *
   * @param title - The task title.
   * @param priority - The task priority. Defaults to `"medium"`.
   * @param description - Optional longer description of the task.
   * @returns The newly created task.
   */
  add(title: string, priority: Priority = "medium", description?: string): Task {
    const task: Task = {
      id: String(this.nextId++),
      title,
      description,
      priority,
      status: "pending",
      createdAt: new Date(),
    }
    this.tasks.set(task.id, task)
    return task
  }

  /**
   * Look up a task by id.
   *
   * @param id - The task id.
   * @returns The matching task, or `undefined` if none exists.
   */
  get(id: string): Task | undefined {
    return this.tasks.get(id)
  }

  /**
   * List tasks, optionally filtered by status and/or priority.
   *
   * @param filter - Optional filter; when both fields are set a task must match both.
   * @returns The matching tasks in insertion order.
   */
  list(filter?: { status?: Status; priority?: Priority }): Task[] {
    let result = Array.from(this.tasks.values())
    if (filter?.status) result = result.filter((t) => t.status === filter.status)
    if (filter?.priority) result = result.filter((t) => t.priority === filter.priority)
    return result
  }

  /**
   * Mark a task as completed and record its completion time.
   *
   * @param id - The id of the task to complete.
   * @returns `true` if the task was found and completed, `false` if not found.
   */
  complete(id: string): boolean {
    const task = this.tasks.get(id)
    if (!task) return false
    task.status = "completed"
    task.completedAt = new Date()
    return true
  }

  // TODO: implement — remove a task by id, return true if removed, false if not found
  /**
   * Remove a task by id. Not yet implemented.
   *
   * @param id - The id of the task to remove.
   * @returns `true` if a task was removed, `false` if not found (once implemented).
   * @throws {Error} Always, with message "not implemented", until implemented.
   */
  remove(id: string): boolean {
    throw new Error("not implemented")
  }

  // TODO: implement — update title/description/priority of a task
  // return true if updated, false if not found
  /**
   * Update the title, description and/or priority of a task. Not yet implemented.
   *
   * @param id - The id of the task to update.
   * @param changes - The fields to change.
   * @returns `true` if the task was updated, `false` if not found (once implemented).
   * @throws {Error} Always, with message "not implemented", until implemented.
   */
  update(id: string, changes: Partial<Pick<Task, "title" | "description" | "priority">>): boolean {
    throw new Error("not implemented")
  }

  // TODO: implement — return all tasks sorted by the given field
  // priority sort order: high > medium > low
  /**
   * Return all tasks sorted by the given field, with priority ordered high > medium > low.
   * Not yet implemented.
   *
   * @param field - The field to sort by.
   * @returns The sorted tasks (once implemented).
   * @throws {Error} Always, with message "not implemented", until implemented.
   */
  sortBy(field: "priority" | "createdAt" | "status"): Task[] {
    throw new Error("not implemented")
  }
}
