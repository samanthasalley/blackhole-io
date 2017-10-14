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
  }

  componentWillMount() {
    fetch('/api/todos')
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }

  addTask(todo) {
    console.log(todo);
    const task = { text: todo, id: this.state.data.length };
    const data = [...this.state.data, task];
    this.setState({ data });
  }

  removeTask(id) {
    const remaining = this.state.data.filter(task => task.id !== id);
    this.setState({ data: remaining });
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