import React from 'react';
import Task from './Task.jsx';

const ToDoList = ({ tasks, remove }) => {
  // const toDoItems = [];
  // for (let x = 0; x < data; x++) {
  //   toDos.push(<Task task={task} key={task.id} remove={remove} />
  // }
  const toDoItem = tasks.map(task => <Task task={task} remove={remove} />);
  return (
    <ul>{toDoItem}</ul>
  );
};

export default ToDoList;
