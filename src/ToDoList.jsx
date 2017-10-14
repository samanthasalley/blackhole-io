import React from 'react';
import Task from './Task.jsx';

const ToDoList = ({ tasks, remove }) => {
  const toDoItem = tasks.map(task => <Task task={task} key={task.id} remove={remove} />);
  return (
    <ul>{toDoItem}</ul>
  );
};

export default ToDoList;
