import React from 'react';
import ListItem from 'material-ui/List/ListItem';
import FontIcon from 'material-ui/FontIcon';

const Task = ({ task, remove }) => {
  const onClick = () => { remove(task) };
  return (
    <ListItem
      primaryText={task}
      disabled={true}
      leftIcon={<FontIcon
        className='fa fa-times'
        onClick={onClick}
        style={{ 'cursor': 'pointer' }}
      />}
    />
  );
};

export default Task;
