import { AddTaskForm } from './components/addTaskForm/addTaskForm';
import ToDoList from './components/toDoList/toDoList';

export default function App() {
  return (
    <div className="container">
      <h1>To-Do List</h1>
      <AddTaskForm />
      <ToDoList />
    </div>
  );
}
