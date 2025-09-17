export type priority = "low" | "medium" | "high";
export default class ToDoItem {
  private id: number;
  private name: string;
  private priority: priority;
  private completed: boolean;
  constructor(
    id: number,
    name: string,
    priority: "low" | "medium" | "high",
    completed: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.priority = priority;
    this.completed = completed;
  }

  getPriority(): priority {
    return this.priority;
  }
  getName(): string {
    return this.name;
  }
  isCompleted(): boolean {
    return this.completed;
  }
  getId(): number {
    return this.id;
  }
  setCompleted(completed: boolean): void {
    this.completed = completed;
  }
}
