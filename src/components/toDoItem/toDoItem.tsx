import React from 'react';
import { type Todo, toggleCompleted,deleteTask} from '../../store/todo/todoSlice';
import { useAppDispatch } from '../../store/hooks';
import './toDoItem.css';
interface Props {
  task: Todo;
}

export const ToDoItem: React.FC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();
  return (
    <li className={`task-item priority-${task.priority}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleCompleted(task.id))}
      />

      <span className={`task${task.completed ? ' completed' : ''}`}>{task.name}</span>

      <div className="button-container">
        <>
          <button className={`edit-task ${task.completed ? 'completed' : ''}`}>Edit</button>
          <button className="delete" onClick={() =>dispatch(deleteTask(task.id))}>X</button>
        </>
      </div>
    </li>
  );
};
