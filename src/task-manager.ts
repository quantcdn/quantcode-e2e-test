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

  /**
   * Remove a task by id. Returns true if a task was removed, false if not found.
   */
  remove(id: string): boolean {
    return this.tasks.delete(id)
  }

  /**
   * Update the title, description and/or priority of a task.
   * Returns true if the task was updated, false if not found.
   */
  update(id: string, changes: Partial<Pick<Task, "title" | "description" | "priority">>): boolean {
    const task = this.tasks.get(id)
    if (!task) return false
    if (changes.title !== undefined) task.title = changes.title
    if (changes.description !== undefined) task.description = changes.description
    if (changes.priority !== undefined) task.priority = changes.priority
    return true
  }

  /**
   * Return all tasks sorted by the given field.
   * priority: high > medium > low. createdAt: oldest first.
   * status: pending > in_progress > completed (workflow order).
   */
  sortBy(field: "priority" | "createdAt" | "status"): Task[] {
    const priorityRank: Record<Priority, number> = { high: 0, medium: 1, low: 2 }
    const statusRank: Record<Status, number> = { pending: 0, in_progress: 1, completed: 2 }
    const tasks = Array.from(this.tasks.values())

    switch (field) {
      case "priority":
        return tasks.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority])
      case "status":
        return tasks.sort((a, b) => statusRank[a.status] - statusRank[b.status])
      case "createdAt":
        return tasks.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    }
  }
}
