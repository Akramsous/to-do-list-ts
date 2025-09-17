import type { priority } from "./todoitem.js";
export default class ToDoList {
    private tasks;
    constructor();
    addTask(taskName: string, taskPriority: priority): void;
    saveTasks(): void;
    loadTasks(): void;
    deleteTask(taskId: number): void;
    markCompleted(id: number, completed: boolean): void;
    editTask(id: number, name: string): void;
    displayTasks(): void;
}
//# sourceMappingURL=todolist.d.ts.map