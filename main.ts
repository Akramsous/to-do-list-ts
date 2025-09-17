import ToDoList from "./todolist.js";
import type { priority } from "./todoitem.js";
const taskInput = document.querySelector(".task-input") as HTMLInputElement;
const taskPriority = document.querySelector(
  ".task-priority"
) as HTMLSelectElement;
const addBtn = document.querySelector(".add-task-button") as HTMLButtonElement;
const filterPriority = document.getElementById(
  "filter-priority"
) as HTMLSelectElement;

const toDoList: ToDoList = new ToDoList();

addBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  const taskName: string = taskInput.value.trim();
  const selectedPriority = taskPriority.value as priority;
  if (taskName === "") {
    alert("Task name cannot be empty");
    return;
  }
  toDoList.addTask(taskName, selectedPriority);
  taskInput.value = "";
});
