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
  editTask(id: number, name: string): void {
    const task = this.tasks.find((t) => t.getId() === id);
    if (task) {
      task.setName(name);
    }
    this.saveTasks();
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
      //checkbox
      const checkBox = createEl("input", "task-checkbox") as HTMLInputElement;
      checkBox.type = "checkbox";
      checkBox.checked = task.isCompleted();
      //checkbox event listeners
      checkBox.addEventListener("change", () => {
        this.markCompleted(task.getId(), checkBox.checked);
        this.displayTasks();
      });
      //task name span
      const spanTask = createEl(
        "span",
        `task${task.isCompleted() ? " completed" : ""}`,
        task.getName()
      ) as HTMLSpanElement;
      //save button creating
      const saveBtn = createEl(
        "button",
        "save-btn d-none",
        "Save"
      ) as HTMLButtonElement;
      //cancel button creating
      const cancelBtn = createEl(
        "button",
        "cancel-btn d-none",
        "Cancel"
      ) as HTMLButtonElement;
      //edit button creation
      const editBtn = createEl(
        "button",
        "edit-task",
        "Edit"
      ) as HTMLButtonElement;
      if (task.isCompleted()) editBtn.classList.add("completed");
      //delete button creation
      const deleteBtn = createEl("button", "delete", "X") as HTMLButtonElement;
      //delete button event lestiners
      deleteBtn.addEventListener("click", () => {
        this.deleteTask(task.getId());
        this.displayTasks();
      });

      //edit button listeners to change the delete and edit buttons to sava and cancel buttons and make the span editable
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

      //save button event listener
      saveBtn.addEventListener("click", (e: Event) => {
        const target = e.target as HTMLElement;
        const li = target.closest("li") as HTMLLIElement;

        if (!li) return;
        const spanTask = li.querySelector(".task") as HTMLSpanElement;
        const saveBtn = li.querySelector(".save-btn") as HTMLButtonElement;
        const cancelBtn = li.querySelector(".cancel-btn") as HTMLButtonElement;
        const editBtn = li.querySelector(".edit-task") as HTMLButtonElement;
        const deleteBtn = li.querySelector(".delete") as HTMLButtonElement;

        this.editTask(task.getId(), spanTask.textContent?.trim() || "");
        saveBtn.classList.add("d-none");
        cancelBtn.classList.add("d-none");
        editBtn.classList.remove("d-none");
        deleteBtn.classList.remove("d-none");
        spanTask.classList.remove("editting-span");
        spanTask.contentEditable = "false";
      });
      //cancel button event listener
      cancelBtn.addEventListener("click", (e: Event) => {
        const target = e.target as HTMLElement;
        const li = target.closest("li") as HTMLLIElement;

        if (!li) return;
        const spanTask = li.querySelector(".task") as HTMLSpanElement;
        const saveBtn = li.querySelector(".save-btn") as HTMLButtonElement;
        const cancelBtn = li.querySelector(".cancel-btn") as HTMLButtonElement;
        const editBtn = li.querySelector(".edit-task") as HTMLButtonElement;
        const deleteBtn = li.querySelector(".delete") as HTMLButtonElement;
        spanTask.textContent = task.getName();
        saveBtn.classList.add("d-none");
        cancelBtn.classList.add("d-none");
        editBtn.classList.remove("d-none");
        deleteBtn.classList.remove("d-none");
        spanTask.classList.remove("editting-span");
        spanTask.contentEditable = "false";
      });
      //appending the li elemnts
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "button-container";
      buttonContainer.append(saveBtn, cancelBtn, editBtn, deleteBtn);

      li.append(checkBox, spanTask, buttonContainer);
      taskList.appendChild(li);
    });
  }
}
