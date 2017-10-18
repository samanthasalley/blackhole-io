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
      <div style={{ 'marginLeft': '2%', 'width': '50%' }}>
        <SelectField
          name='taskType'
          hintText='select column...'
          floatingLabelText='Sort Tasks By:'
          floatingLabelFixed={true}
          floatingLabelStyle={{ 'color': 'black', 'fontSize': '1.3em' }}
          onChange={props.handleSortOptionsSelectionChange}
          value={props.sortBy}
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
    </div>
  );
};

export default TaskSortBar;