import React from 'react';
import { ToDoItem } from '../toDoItem/toDoItem';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import './toDoList.css';
import { setFilter, type taskPriority } from '../../store/todo/todoSlice';

const ToDoList: React.FC = () => {
  const { tasks, filter } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const filteredTasks = filter === 'all' ? tasks : tasks.filter((t) => t.priority === filter);
  return (
    <>
      <div className="filter">
        <select onChange={(e) => dispatch(setFilter(e.target.value as taskPriority))}>
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <ul id="task-list">
          {filteredTasks.map((task) => (
            <ToDoItem key={task.id} task={task} />
          ))}
        </ul>
      </div>
    </>
  );
};
export default ToDoList;
