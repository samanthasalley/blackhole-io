import React from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';

const styles = {
  active: {
    'textDecoration':'none'
  },
  closed: {
    'textDecoration': 'line-through'
  },
};

const Task = (props) => {
  const onClickDelete = () => { props.removeTask(props.task) };
  const onClickComplete = () => { props.toggleComplete(props.task) };
  const columns = [];
  columns.push(
    <TableRowColumn
      key={0}
      style={{ 'textAlign': 'center' }}
    >
      <FontIcon
        className={props.task.status === 'active' ? 'fa fa-check' : 'fa fa-undo'}
        onClick={onClickComplete}
        style={{ 'cursor': 'pointer', 'color': 'darkgray' }}
      />
    </TableRowColumn>
  );
  Object.keys(props.task).forEach((key, i) => {
    if(i < Object.keys(props.task).length - 1){
      let item = props.task[key];
      if(item instanceof Date) item = item.getMonth() + 1 + "/" + item.getDate() + "/" + item.getFullYear();
      columns.push(
        <TableRowColumn key={i+1}>{item}</TableRowColumn>
      );
    }
  });
  columns.push(
    <TableRowColumn
      key={4}
      style={{ 'textAlign': 'center' }}
    >
      <FontIcon
        className='fa fa-times'
        onClick={onClickDelete}
        style={{ 'cursor': 'pointer', 'color': 'darkgray' }}
      />
    </TableRowColumn>
  );

  return (
    <TableRow style={styles[props.task.status]}>
      {columns}
    </TableRow>
  );
};

export default Task;
