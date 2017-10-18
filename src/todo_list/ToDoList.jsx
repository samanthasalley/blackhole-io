import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import Task from './Task.jsx';

const ToDoList = ({ tasks, remove }) => {
  const taskItems = tasks.map((task, i) => <Task key={i} task={task} remove={remove} />);
  return (
    <Table style={{backgroundColor: 'transparent'}}>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          <TableHeaderColumn style={{'textAlign':'center'}}>Delete Task</TableHeaderColumn>
          <TableHeaderColumn style={{'textAlign':'center'}}>Task Name</TableHeaderColumn>
          <TableHeaderColumn style={{'textAlign':'center'}}>Task Type</TableHeaderColumn>
          <TableHeaderColumn style={{'textAlign':'center'}}>Due/Reminder Date</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {taskItems}
      </TableBody>
    </Table>
  );
};

export default ToDoList;
