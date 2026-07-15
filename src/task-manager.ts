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

  // TODO: implement — remove a task by id, return true if removed, false if not found
  remove(id: string): boolean {
    if (!this.tasks.has(id)) return false
    this.tasks.delete(id)
    return true
  }

  // TODO: implement — update title/description/priority of a task
  // return true if updated, false if not found
  update(id: string, changes: Partial<Pick<Task, "title" | "description" | "priority">>): boolean {
    const task = this.tasks.get(id)
    if (!task) return false
    for (const key of Object.keys(changes) as Array<keyof typeof changes>) {
      if (changes[key] !== undefined) {
        (task as Record<string, unknown>)[key] = changes[key]
      }
    }
    return true
  }

  // TODO: implement — return all tasks sorted by the given field
  // priority sort order: high > medium > low
  sortBy(field: "priority" | "createdAt" | "status"): Task[] {
    const all = Array.from(this.tasks.values())
    if (field === "priority") {
      const weight: Record<Priority, number> = { high: 0, medium: 1, low: 2 }
      return [...all].sort((a, b) => weight[a.priority] - weight[b.priority])
    }
    if (field === "createdAt") {
      return [...all].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    }
    return [...all].sort((a, b) => a.status.localeCompare(b.status))
  }
}
