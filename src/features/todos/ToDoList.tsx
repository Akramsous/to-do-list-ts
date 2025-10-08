import React from 'react';
import { ToDoItem } from './ToDoItem';
import { useAppSelector } from '../../app/hooks';

const ToDoList: React.FC = () => {
  const { tasks } = useAppSelector((state) => state.todos);
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

      <ul id="task-list">
        {tasks.map((task) => (
          <ToDoItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};
export default ToDoList;
