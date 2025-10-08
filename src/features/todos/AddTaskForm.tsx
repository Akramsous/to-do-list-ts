import React from 'react';

export const AddTaskForm: React.FC = () => {
  return (
    <form className="task-form">
      <input type="text" className="task-input" placeholder="Enter a new task" />
      <select className="task-priority">
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
