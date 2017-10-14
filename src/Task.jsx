import React from 'react';

const Task = ({ task, remove }) => {
  const onClick = () => { remove(task.id) };
  return (<li onClick={onClick}>{task.text}</li>);
};

export default Task;
