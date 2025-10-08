import React from 'react';
import { ToDoItem } from '../toDoItem/toDoItem';
import { useAppSelector } from '../../store/hooks';
import './toDoList.css';

const ToDoList: React.FC = () => {
  const { tasks } = useAppSelector((state) => state.todos);
  return (<>
    
      <div className="filter">
        <select>
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
       <div>
      <ul id="task-list">
        {tasks.map((task) => (
          <ToDoItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
    </>
  );
};
export default ToDoList;
