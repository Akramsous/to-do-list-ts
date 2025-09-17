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
  //save tasks function which saves tasks to local storage
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
  //delete task function which deletes task from #tasks array by id then saves changes to local storage
  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((t) => t.getId() != taskId);
    this.saveTasks();
  }
  //mark tasks completed
  markCompleted(id: number, completed: boolean): void {
    const task = this.tasks.find((t) => t.getId() === id);
    if (task) {
      task.setCompleted(completed);
      this.saveTasks();
    }
  }
  // display tasks and while adding tasks it also adds event listeners
  displayTasks(): void {
    const filterPriority = document.getElementById(
      "filter-priority"
    ) as HTMLSelectElement;
    const taskList = document.getElementById("task-list") as HTMLUListElement;
    taskList.innerHTML = "";

    const tasks =
      filterPriority.value === "all"
        ? this.tasks
        : this.tasks.filter((t) => t.getPriority() === filterPriority.value);

    const createEl = (
      tag: string,
      btnClass: string,
      text = ""
    ): HTMLElement => {
      const btn = document.createElement(tag);
      btn.className = btnClass;
      if (text) btn.textContent = text;
      return btn;
    };

    tasks.forEach((task) => {
      const li = createEl(
        "li",
        `task-item priority-${task.getPriority()}`
      ) as HTMLLIElement;

      const checkBox = createEl("input", "task-checkbox") as HTMLInputElement;
      checkBox.type = "checkbox";
      checkBox.checked = task.isCompleted();

      const spanTask = createEl(
        "span",
        `task${task.isCompleted() ? " completed" : ""}`,
        task.getName()
      ) as HTMLSpanElement;

      const saveBtn = createEl(
        "button",
        "save-btn d-none",
        "Save"
      ) as HTMLButtonElement;
      const cancelBtn = createEl(
        "button",
        "cancel-btn d-none",
        "Cancel"
      ) as HTMLButtonElement;
      const editBtn = createEl(
        "button",
        "edit-task",
        "Edit"
      ) as HTMLButtonElement;
      if (task.isCompleted()) editBtn.classList.add("completed");
      const deleteBtn = createEl("button", "delete", "X") as HTMLButtonElement;
      deleteBtn.addEventListener("click", () => {
        this.deleteTask(task.getId());
        this.displayTasks();
      });

      editBtn.addEventListener("click", () => {
        if (task.isCompleted()) return;
        saveBtn.classList.remove("d-none");
        cancelBtn.classList.remove("d-none");
        editBtn.classList.add("d-none");
        deleteBtn.classList.add("d-none");
        spanTask.contentEditable = "plaintext-only";
        spanTask.focus();
        spanTask.classList.add("editting-span");
      });

      const buttonContainer = document.createElement("div");
      buttonContainer.className = "button-container";
      buttonContainer.append(saveBtn, cancelBtn, editBtn, deleteBtn);

      li.append(checkBox, spanTask, buttonContainer);
      taskList.appendChild(li);
    });
  }
}
