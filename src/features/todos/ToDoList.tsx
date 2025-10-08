import React from 'react';

export const ToDoList: React.FC = () => {
  return (
    <div>
      <div className="filter">
        <select>
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <ul id="task-list"></ul>
    </div>
  );
};
