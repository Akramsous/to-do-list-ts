import React, { useState } from 'react';
import { type Todo, toggleCompleted, deleteTask,editTask } from '../../store/todo/todoSlice';
import { useAppDispatch } from '../../store/hooks';
import './toDoItem.css';
interface Props {
  task: Todo;
}

export const ToDoItem: React.FC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);
  const handleSave = () => {
    dispatch(editTask({ id: task.id, name: newName.trim() || task.name }));
    setIsEditing(false);
  };

  return (
    <li className={`task-item priority-${task.priority}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleCompleted(task.id))}
      />

      {isEditing ? (
        <input className="task-edit" value={newName} onChange={(e) => setNewName(e.target.value)} />
      ) : (
        <span className={`task ${task.completed ? 'completed' : ''}`}>{task.name}</span>
      )}

      <div className="button-container">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className={`edit-task ${task.completed ? 'completed' : ''}`}
              onClick={() => !task.completed && setIsEditing(true)}
              disabled={task.completed}
            >
              Edit
            </button>
            <button className="delete" onClick={() => dispatch(deleteTask(task.id))}>
              X
            </button>
          </>
        )}
      </div>
    </li>
  );
};
