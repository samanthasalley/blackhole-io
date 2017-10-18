import React from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';

const Task = (props) => {
  const onClick = () => { props.remove(props.task) };
  const columns = [];
  columns.push(
    <TableRowColumn
      key={0}
      style={{ 'textAlign': 'center' }}
    >
      <FontIcon
        className='fa fa-times'
        onClick={onClick}
        style={{ 'cursor': 'pointer', 'color': 'darkgray' }}
      />
    </TableRowColumn>
  );
  Object.keys(props.task).forEach((key, i) => {
    let item = props.task[key];
    if(typeof item === 'object' && Object.keys(item).length > 0) item = new Date(item).toISOString;
    if(typeof item === 'object' && Object.keys(item).length === 0) item = '';
    columns.push(
      <TableRowColumn key={i+1}>{item}</TableRowColumn>
    );
  });

  return (
    <TableRow>
      {columns}
    </TableRow>
  );
};

export default Task;
