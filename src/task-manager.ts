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

export class TaskManager {
  private tasks: Map<string, Task> = new Map()
  private nextId = 1

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

  get(id: string): Task | undefined {
    return this.tasks.get(id)
  }

  list(filter?: { status?: Status; priority?: Priority }): Task[] {
    let result = Array.from(this.tasks.values())
    if (filter?.status) result = result.filter((t) => t.status === filter.status)
    if (filter?.priority) result = result.filter((t) => t.priority === filter.priority)
    return result
  }

  complete(id: string): boolean {
    const task = this.tasks.get(id)
    if (!task) return false
    task.status = "completed"
    task.completedAt = new Date()
    return true
  }

  /** Remove a task by id. Returns true if removed, false if not found. */
  remove(id: string): boolean {
    return this.tasks.delete(id)
  }

  /**
   * Update the title, description and/or priority of a task.
   *
   * Omitted keys are always left untouched. An explicit `undefined` behaves
   * differently per field, because `title` and `priority` are required on Task
   * while `description` is optional:
   *   - `title` / `priority`: an explicit `undefined` is ignored, so a required
   *     field can never be blanked out.
   *   - `description`: an explicit `undefined` clears it.
   *
   * Returns true if updated, false if the task was not found.
   */
  update(id: string, changes: Partial<Pick<Task, "title" | "description" | "priority">>): boolean {
    const task = this.tasks.get(id)
    if (!task) return false
    if ("title" in changes && changes.title !== undefined) task.title = changes.title
    if ("description" in changes) task.description = changes.description
    if ("priority" in changes && changes.priority !== undefined) task.priority = changes.priority
    return true
  }

  /** Return all tasks sorted by the given field, without mutating internal order. */
  sortBy(field: "priority" | "createdAt" | "status"): Task[] {
    const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 }
    const statusOrder: Record<Status, number> = { in_progress: 0, pending: 1, completed: 2 }

    return Array.from(this.tasks.values()).sort((a, b) => {
      switch (field) {
        case "priority":
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        case "status":
          return statusOrder[a.status] - statusOrder[b.status]
        case "createdAt":
          return a.createdAt.getTime() - b.createdAt.getTime()
      }
    })
  }
}
