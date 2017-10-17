import React from 'react';
import List from 'material-ui/List';
import Task from './Task.jsx';

const ToDoList = ({ tasks, remove }) => {
  // const toDoItems = [];
  // for (let x = 0; x < data; x++) {
  //   toDos.push(<Task task={task} key={task.id} remove={remove} />
  // }
  const toDoItem = tasks.map((task, i) => <Task key={i} task={task} remove={remove} />);
  return (
    <List>{toDoItem}</List>
  );
};

export default ToDoList;
