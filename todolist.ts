import ToDoItem from "./todoitem.js";
import type { priority } from "./todoitem.js";
export default class ToDoList {
  private tasks: ToDoItem[];
  constructor() {
    this.tasks = [];
    this.loadTasks();
  }
  addTask(taskName: string, taskPriority: priority): void {
    const item: ToDoItem = new ToDoItem(Date.now(), taskName, taskPriority);
    this.tasks.push(item);
    this.saveTasks();
  }
  saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
  loadTasks(): void {
    const data = localStorage.getItem("tasks");
    if (data) {
      this.tasks = JSON.parse(data).map(
        (t: {
          id: number;
          name: string;
          priority: priority;
          completed: boolean;
        }) => new ToDoItem(t.id, t.name, t.priority, t.completed)
      );
    }
  }
}
