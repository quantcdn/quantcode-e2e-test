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

  remove(id: string): boolean {
    if (!this.tasks.has(id)) return false
    this.tasks.delete(id)
    return true
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
    const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 }
    const tasks = Array.from(this.tasks.values())
    return tasks.slice().sort((a, b) => {
      if (field === "priority") return priorityOrder[a.priority] - priorityOrder[b.priority]
      if (field === "createdAt") return a.createdAt.getTime() - b.createdAt.getTime()
      return a.status.localeCompare(b.status)
    })
  }
}
