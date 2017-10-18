import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

const TaskSortBar = (props) => {
  let sortOptions = props.sortOptions.map((opt, i) => {
    return <MenuItem key={i + 1} value={opt.value} primaryText={opt.name} />
  });
  return (
    <div>
      <h3>Sort/Filter Options: </h3>
      <SelectField
        name='taskType'
        hintText='Select sort field...'
        floatingLabelText='Sort Tasks By:'
        /* floatingLabelStyle={{ 'color': 'black' }} */
        onChange={props.handleSortOptionsSelectionChange}
        value={props.sortBy}
        style={{'marginLeft':'2%'}}
      >
        <MenuItem key={0} value={null} primaryText='' />
        {sortOptions}
      </SelectField>
      <Toggle 
        label='Show completed tasks:'
        toggled={props.showCompleted}
        onToggle={props.handleSortOptionsToggleCompletedChange}
      />
    </div>
  );
};

export default TaskSortBar;