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

const PRIORITY_RANK: Record<Priority, number> = { high: 0, medium: 1, low: 2 }
const STATUS_RANK: Record<Status, number> = { pending: 0, in_progress: 1, completed: 2 }

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

  remove(id: string): boolean {
    return this.tasks.delete(id)
  }

  update(id: string, changes: Partial<Pick<Task, "title" | "description" | "priority">>): boolean {
    const task = this.tasks.get(id)
    if (!task) return false
    if (changes.title !== undefined) task.title = changes.title
    if (changes.description !== undefined) task.description = changes.description
    if (changes.priority !== undefined) task.priority = changes.priority
    return true
  }

  sortBy(field: "priority" | "createdAt" | "status"): Task[] {
    const result = this.list()
    switch (field) {
      case "priority":
        return result.sort(
          (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] || Number(a.id) - Number(b.id),
        )
      case "status":
        return result.sort((a, b) => STATUS_RANK[a.status] - STATUS_RANK[b.status] || Number(a.id) - Number(b.id))
      case "createdAt":
        return result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime() || Number(a.id) - Number(b.id))
    }
  }
}
