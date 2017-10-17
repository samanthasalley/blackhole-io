import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const AddToDo = (props) => {
  return (
    <div>
      <TextField
        name='task'
        hintText='new task here...'
        value={props.newTask}
        onChange={props.handleNewTaskChange}
      />
      <IconButton
        type="submit"
        onClick={props.addTask}
      >
        <FontIcon className='fa fa-plus' />
      </IconButton>
    </div>
  );
};

export default AddToDo;
