import { AddTaskForm } from './features/todos/AddTaskForm';
import ToDoList from './features/todos/ToDoList';

export default function App() {
  return (
    <div className="container">
      <h1>To-Do List</h1>
      <AddTaskForm />
      <ToDoList />
    </div>
  );
}
