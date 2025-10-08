import React from 'react';
import { useState } from 'react';
import type { taskPriority } from '../../store/todo/todoSlice';
import { useAppDispatch } from '../../store/hooks';
import { addTask } from '../../store/todo/todoSlice';
import './addTaskForm.css';
export const AddTaskForm: React.FC = () => {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState<taskPriority>('low');
  const dispatch = useAppDispatch();
  const handeleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    dispatch(addTask({ name, priority }));
    setName('');
  };
  return (
    <form onSubmit={handeleSubmit} className="task-form">
      <input
        type="text"
        className="task-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter a new task"
      />
      <select
        className="task-priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as taskPriority)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" className="add-task-button">
        Add Task
      </button>
    </form>
  );
};
