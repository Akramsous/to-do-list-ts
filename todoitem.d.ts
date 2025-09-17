export type priority = "low" | "medium" | "high";
export default class ToDoItem {
    private id;
    private name;
    private priority;
    private completed;
    constructor(id: number, name: string, priority: "low" | "medium" | "high", completed?: boolean);
    getPriority(): priority;
    getName(): string;
    isCompleted(): boolean;
    getId(): number;
    setCompleted(completed: boolean): void;
    setName(name: string): void;
    toJSON(): {
        id: number;
        name: string;
        priority: priority;
        completed: boolean;
    };
}
//# sourceMappingURL=todoitem.d.ts.map