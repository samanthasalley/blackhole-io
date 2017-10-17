import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const NewTaskForm = (props) => {
  let taskTypes = props.taskTypes.map(type => <MenuItem value={type} primaryText={type} />);
  return (
    <div>
      <TextField
        name='task'
        hintText='new task here...'
        value={props.newTask.name}
        onChange={props.handleNewTaskInputChange}
      />
      <SelectField 
        id='new-task-type'
        onChange={props.handleNewTaskSelectChange}
        value={props.newTask.taskType}
      >
        {taskTypes}
      </SelectField>
      {}
      <IconButton
        type="submit"
        onClick={props.addTask}
      >
        <FontIcon className='fa fa-plus' />
      </IconButton>
    </div>
  );
};

export default NewTaskForm;
