import React from 'react';

const Task = ({ task, remove }) => {
  const onClick = () => { remove(task.id) };
  return (<li onClick={onClick}>{task}</li>);
};

export default Task;
