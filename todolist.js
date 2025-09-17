import ToDoItem from "./todoitem.js";
export default class ToDoList {
    tasks;
    constructor() {
        this.tasks = [];
        this.loadTasks();
    }
    addTask(taskName, taskPriority) {
        const item = new ToDoItem(Date.now(), taskName, taskPriority);
        this.tasks.push(item);
        this.saveTasks();
        this.displayTasks();
    }
    //save tasks function which saves tasks to local storage
    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    loadTasks() {
        const data = localStorage.getItem("tasks");
        if (data) {
            this.tasks = JSON.parse(data).map((t) => new ToDoItem(t.id, t.name, t.priority, t.completed));
        }
    }
    //delete task function which deletes task from #tasks array by id then saves changes to local storage
    deleteTask(taskId) {
        this.tasks = this.tasks.filter((t) => t.getId() != taskId);
        this.saveTasks();
    }
    //mark tasks completed
    markCompleted(id, completed) {
        const task = this.tasks.find((t) => t.getId() === id);
        if (task) {
            task.setCompleted(completed);
            this.saveTasks();
        }
    }
    editTask(id, name) {
        const task = this.tasks.find((t) => t.getId() === id);
        if (task) {
            task.setName(name);
        }
        this.saveTasks();
    }
    // display tasks and while adding tasks it also adds event listeners
    displayTasks() {
        const filterPriority = document.getElementById("filter-priority");
        const taskList = document.getElementById("task-list");
        taskList.innerHTML = "";
        const tasks = filterPriority.value === "all"
            ? this.tasks
            : this.tasks.filter((t) => t.getPriority() === filterPriority.value);
        const createEl = (tag, btnClass, text = "") => {
            const btn = document.createElement(tag);
            btn.className = btnClass;
            if (text)
                btn.textContent = text;
            return btn;
        };
        tasks.forEach((task) => {
            const li = createEl("li", `task-item priority-${task.getPriority()}`);
            //checkbox
            const checkBox = createEl("input", "task-checkbox");
            checkBox.type = "checkbox";
            checkBox.checked = task.isCompleted();
            //checkbox event listeners
            checkBox.addEventListener("change", () => {
                this.markCompleted(task.getId(), checkBox.checked);
                this.displayTasks();
            });
            //task name span
            const spanTask = createEl("span", `task${task.isCompleted() ? " completed" : ""}`, task.getName());
            //save button creating
            const saveBtn = createEl("button", "save-btn d-none", "Save");
            //cancel button creating
            const cancelBtn = createEl("button", "cancel-btn d-none", "Cancel");
            //edit button creation
            const editBtn = createEl("button", "edit-task", "Edit");
            if (task.isCompleted())
                editBtn.classList.add("completed");
            //delete button creation
            const deleteBtn = createEl("button", "delete", "X");
            //delete button event lestiners
            deleteBtn.addEventListener("click", () => {
                this.deleteTask(task.getId());
                this.displayTasks();
            });
            //edit button listeners to change the delete and edit buttons to sava and cancel buttons and make the span editable
            editBtn.addEventListener("click", () => {
                if (task.isCompleted())
                    return;
                saveBtn.classList.remove("d-none");
                cancelBtn.classList.remove("d-none");
                editBtn.classList.add("d-none");
                deleteBtn.classList.add("d-none");
                spanTask.contentEditable = "plaintext-only";
                spanTask.focus();
                spanTask.classList.add("editting-span");
            });
            //save button event listener
            saveBtn.addEventListener("click", (e) => {
                const target = e.target;
                const li = target.closest("li");
                if (!li)
                    return;
                const spanTask = li.querySelector(".task");
                const saveBtn = li.querySelector(".save-btn");
                const cancelBtn = li.querySelector(".cancel-btn");
                const editBtn = li.querySelector(".edit-task");
                const deleteBtn = li.querySelector(".delete");
                this.editTask(task.getId(), spanTask.textContent?.trim() || "");
                saveBtn.classList.add("d-none");
                cancelBtn.classList.add("d-none");
                editBtn.classList.remove("d-none");
                deleteBtn.classList.remove("d-none");
                spanTask.classList.remove("editting-span");
                spanTask.contentEditable = "false";
            });
            //cancel button event listener
            cancelBtn.addEventListener("click", (e) => {
                const target = e.target;
                const li = target.closest("li");
                if (!li)
                    return;
                const spanTask = li.querySelector(".task");
                const saveBtn = li.querySelector(".save-btn");
                const cancelBtn = li.querySelector(".cancel-btn");
                const editBtn = li.querySelector(".edit-task");
                const deleteBtn = li.querySelector(".delete");
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
//# sourceMappingURL=todolist.js.map