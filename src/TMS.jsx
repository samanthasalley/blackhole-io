import React from 'react';
import ToDoList from './ToDoList.jsx';
import AddToDo from './AddToDo.jsx';

class TMS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

    this.removeTask = this.removeTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentWillMount() {
    fetch('/api/todos')
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }

  addTask(todo) {
    console.log(todo);
    const task = todo;
    const data = [...this.state.data, task];
    this.setState({ data: data }, this.updateData);
  }

  removeTask(task) {
    console.log(task);
    let data = this.state.data;
    data.splice(data.indexOf(task),1);
    this.setState({ data: data }, this.updateData);
  }

  updateData() {
    let data = this.state;
    console.log(data);
    fetch('/api/todos', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data) });
  }
  

  render() {
    return (
      <div id="TMS">
        <h1>TO DO LIST</h1>
        <ToDoList
          tasks={this.state.data}
          remove={this.removeTask}
        />
        <AddToDo addTask={this.addTask} />
      </div>
    );
  }
}

export default TMS;