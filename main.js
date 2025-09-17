import ToDoList from "./todolist.js";
const taskInput = document.querySelector(".task-input");
const taskPriority = document.querySelector(".task-priority");
const addBtn = document.querySelector(".add-task-button");
const filterPriority = document.getElementById("filter-priority");
const toDoList = new ToDoList();
toDoList.displayTasks();
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const taskName = taskInput.value.trim();
    const selectedPriority = taskPriority.value;
    if (taskName === "") {
        alert("Task name cannot be empty");
        return;
    }
    toDoList.addTask(taskName, selectedPriority);
    taskInput.value = "";
});
filterPriority.addEventListener("change", () => {
    toDoList.displayTasks();
});
//# sourceMappingURL=main.js.map