import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import Task from './Task.jsx';

const TaskList = ({ tasks, sortBy, showCompleted, removeTask, toggleComplete }) => {
  let taskItems = tasks ? tasks.slice(0) : null;
  if (!showCompleted) taskItems = taskItems.filter(task => task.status === 'active');
  if (sortBy) {
    console.log('sort items');
    taskItems = taskItems.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
          break;
        default:
          return (a[sortBy] < b[sortBy] ? -1 : (a[sortBy] > b[sortBy] ? 1 : 0));
          break;
      }
    });
  }
  taskItems = taskItems ? taskItems.map((task, i) => <Task key={i} task={task} removeTask={removeTask} toggleComplete={toggleComplete} />) : null;
  return (
    <div>
      <h3>Task List: </h3>
      <Table style={{ 'backgroundColor': 'transparent' }}>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn style={{ 'textAlign': 'center' }}>Complete Task</TableHeaderColumn>
            <TableHeaderColumn>Task Name</TableHeaderColumn>
            <TableHeaderColumn>Task Type</TableHeaderColumn>
            <TableHeaderColumn>Due/Reminder Date</TableHeaderColumn>
            <TableHeaderColumn style={{ 'textAlign': 'center' }}>Delete Task</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taskItems}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskList;
