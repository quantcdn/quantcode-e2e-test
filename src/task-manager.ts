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
  private tasks: Task[] = []
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
    this.tasks.push(task)
    return task
  }

  get(id: string): Task | undefined {
    return this.tasks.find((t) => t.id === id)
  }

  list(filter?: { status?: Status; priority?: Priority }): Task[] {
    if (!filter) return [...this.tasks]
    return this.tasks.filter((t) => {
      if (filter.status && t.status !== filter.status) return false
      if (filter.priority && t.priority !== filter.priority) return false
      return true
    })
  }

  complete(id: string): boolean {
    const task = this.get(id)
    if (!task) return false
    task.status = "completed"
    task.completedAt = new Date()
    return true
  }

  remove(id: string): boolean {
    const index = this.tasks.findIndex((t) => t.id === id)
    if (index === -1) return false
    this.tasks.splice(index, 1)
    return true
  }

  update(id: string, changes: Partial<Pick<Task, "title" | "description" | "priority">>): boolean {
    const task = this.get(id)
    if (!task) return false
    if (changes.title !== undefined) task.title = changes.title
    if (changes.description !== undefined) task.description = changes.description
    if (changes.priority !== undefined) task.priority = changes.priority
    return true
  }

  sortBy(field: "priority" | "createdAt" | "status"): Task[] {
    const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 }
    const statusOrder: Record<Status, number> = { pending: 0, in_progress: 1, completed: 2 }
    return [...this.tasks].sort((a, b) => {
      if (field === "priority") {
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      if (field === "createdAt") {
        return a.createdAt.getTime() - b.createdAt.getTime()
      }
      return statusOrder[a.status] - statusOrder[b.status]
    })
  }
}