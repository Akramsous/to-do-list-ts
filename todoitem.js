export default class ToDoItem {
    id;
    name;
    priority;
    completed;
    constructor(id, name, priority, completed = false) {
        this.id = id;
        this.name = name;
        this.priority = priority;
        this.completed = completed;
    }
    getPriority() {
        return this.priority;
    }
    getName() {
        return this.name;
    }
    isCompleted() {
        return this.completed;
    }
    getId() {
        return this.id;
    }
    setCompleted(completed) {
        this.completed = completed;
    }
    setName(name) {
        this.name = name;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            priority: this.priority,
            completed: this.completed,
        };
    }
}
//# sourceMappingURL=todoitem.js.map