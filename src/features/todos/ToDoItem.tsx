import React, { useState } from 'react';

interface Props {}

export const ToDoItem: React.FC<Props> = () => {
  return (
    <li className={'task-item priority'}>
      <input type="checkbox" />

      <span className="task-name"></span>

      <div className="button-container">
        <>
          <button className="edit-task ">Edit</button>
          <button className="delete">X</button>
        </>
      </div>
    </li>
  );
};
