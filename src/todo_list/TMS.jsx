import React from 'react';
import ToDoList from './ToDoList.jsx';
import NewTaskForm from './NewTaskForm.jsx';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { grey300, purple50 } from 'material-ui/styles/colors';

// Speech recognition
import Artyom from 'artyom.js';
import ArtyomCommandsManager from './speech_recognition/ArtyomCommands.js';

const Jeeves = new Artyom();

const newTask = {
  name: '',
  type: '',
  date: {}
};

class TMS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // main state
      data: [],
      newTask: Object.assign(newTask),
      taskTypes: ['Todo', 'Reminder', 'Note'],
      // speech rec state
      jeevesActive: false
    };

    // general task functions
    this.addTask = this.addTask.bind(this);
    this.updateData = this.updateData.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.handleNewTaskInputChange = this.handleNewTaskInputChange.bind(this);

    // speech recognition functions
    this.stopJeeves = this.stopJeeves.bind(this);
    this.startJeeves = this.startJeeves.bind(this);
    this.handleNewItem = this.handleNewItem.bind(this);

    // speech recognition commands
    let CommandsManager = new ArtyomCommandsManager(Jeeves, { handleNewItem: this.handleNewItem, stopJeeves: this.stopJeeves });
    CommandsManager.loadCommands();
  }

  componentWillMount() {
    fetch('/api/todos')
      .then(response => response.json())
      .then(data => this.setState({ data: data }))
      .catch(err => console.log('Error getting todos'));
  }

  handleNewTaskInputChange(ev) {
    let target = ev.target;
    let name = target.name;
    let value = target.value;
    let newTask = Object.assign(this.state.newTask);
      newTask[name] = value;
    this.setState({newTask: newTask});
  }

  addTask() {
    const task = this.state.newTask;
    console.log(task);
    const data = [...this.state.data, task];
    this.setState({ data: data }, this.updateData);
  }

  removeTask(task) {
    console.log(task);
    let data = this.state.data;
    data.splice(data.indexOf(task), 1);
    this.setState({ data: data }, this.updateData);
  }

  updateData() {
    let data = this.state;
    console.log(data);
    fetch('/api/todos', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(() => this.setState({newTask:''}))
    .catch(err => console.log('Error updating todo data', err));
  }

  /**
   * SPEECH RECOGNITION METHODS
   */

  /**
   * startJeeves - start listening
   */
  startJeeves() {
    console.log('Waking Jeeves...');

    Jeeves.initialize({
      lang: 'en-US',
      debug: true,
      continuous: true,
      soundex: true,
      listen: true
    })
      .then(() => {
        // shows available commands
        console.log(Jeeves.getAvailableCommands());

        Jeeves.say('How can I help you?');

        this.setState({
          jeevesActive: true
        });
      })
      .catch(err => {
        console.error('Couldn\'t wake Jeeves', err);
      });
  }

  stopJeeves() {
    console.log('Jeeves is going to sleep now...');
    Jeeves.fatality()
      .then(() => {
        this.setState({
          jeevesActive: false
        });
      })
      .catch(err => {
        console.error('Couldn\'t put Jeeves back to sleep!', err);
        this.setState({
          jeevesActive: false
        });
      });
  }

  handleNewItem(name) {
    console.log('Ready to create new item: ', name);
    this.setState({newTask:name}, this.addTask);
  }

  render() {
    const tmsStyle = {
      height: '100%',
      width: '70%',
      margin: 20,
      backgroundColor: purple50,
      float: 'left',
    }
    return (
      <Paper style={tmsStyle} zDepth={5}>
        <div id="TMS">
          <h1>TO DO LIST</h1>
          <ToDoList
            tasks={this.state.data}
            remove={this.removeTask}
          />
          <NewTaskForm newTask={this.state.newTask} addTask={this.addTask} handleNewTaskInputChange={this.handleNewTaskInputChange} />

          <IconButton
            onClick={!this.state.jeevesActive ? this.startJeeves : this.stopJeeves}
          >
            <FontIcon
              className="fa fa-microphone"
              color={this.state.jeevesActive ? 'blue' : 'black'}
              hoverColor={this.state.jeevesActive ? 'gray' : 'blue'}
            />
          </IconButton>

        </div>
      </Paper>
    );
  }
}

export default TMS;

// 
// 