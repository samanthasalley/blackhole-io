import React from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { grey300, purple50 } from 'material-ui/styles/colors';

// Main task components
import TaskSortBar from './TaskSortBar.jsx';
import TaskList from './TaskList.jsx';
import NewTaskForm from './NewTaskForm.jsx';
// Speech recognition components
import Artyom from 'artyom.js';
import ArtyomCommandsManager from './speech_recognition/ArtyomCommands.js';

const Jeeves = new Artyom();
const today = new Date();

const newTaskTemplate = {
  name: '',
  type: '',
  date: today,
  status: 'active'
};


const testData = [
  {
    name: 'I\'m a task.',
    type: 'Todo',
    date: today,
    status: 'active',
    _id: '',
  },
  {
    name: 'Another Task',
    type: 'Todo',
    date: today,
    status: 'closed',
    _id: '',
  },
  {
    name: 'Ohh, remind me to be awesome',
    type: 'Reminder',
    date: today,
    status: 'active',
    _id: '',
  },
  {
    name: 'Just a note!',
    type: 'Note',
    date: '',
    status: 'active',
    _id: '',
  },
]

class TMS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // main state
      tasks: [],
      newTask: Object.assign(newTaskTemplate),
      taskTypes: ['Todo', 'Reminder', 'Note'],
      taskStatuses: ['active', 'closed'],
      sortOptions: [
        { 'name': 'Name', 'value': 'name' },
        { 'name': 'Type', 'value': 'type' },
        { 'name': 'Due/Reminder Date', 'value': 'date' },
        { 'name': 'Status', 'value': 'status' },
      ],
      sortBy: null,
      showCompleted: false,
      // speech rec state
      jeevesActive: false
    };

    // general task functions
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.handleNewTaskDateChange = this.handleNewTaskDateChange.bind(this);
    this.handleNewTaskInputChange = this.handleNewTaskInputChange.bind(this);
    this.handleNewTaskSelectChange = this.handleNewTaskSelectChange.bind(this);
    this.handleSortOptionsSelectionChange = this.handleSortOptionsSelectionChange.bind(this);
    this.handleSortOptionsToggleCompletedChange = this.handleSortOptionsToggleCompletedChange.bind(this);

    // speech recognition functions
    this.stopJeeves = this.stopJeeves.bind(this);
    this.startJeeves = this.startJeeves.bind(this);
    this.handleJeevesNew = this.handleJeevesNew.bind(this);
    this.handleJeevesDateUpdate = this.handleJeevesDateUpdate.bind(this);

    // speech recognition commands
    let CommandsManager = new ArtyomCommandsManager(Jeeves, { handleJeevesNew: this.handleJeevesNew, handleJeevesDateUpdate: this.handleJeevesDateUpdate, stopJeeves: this.stopJeeves });
    CommandsManager.loadCommands();
  }

  componentWillMount() {
    fetch('/api/todos')
      .then(response => response.json())
      .then(data => {
        const tasks = data.rows.map(task => ({ 'name': task.item, 'type': task.item_type, 'date': new Date(task.date), 'status': task.status, '_id': task._id }));
        this.setState({ tasks: tasks });
      })
      .catch(err => console.log('Error getting todos', err));
  }

  handleNewTaskDateChange(ev, date) {
    const newTask = Object.assign({}, this.state.newTask);
    newTask.date = date;
    this.setState({
      newTask: newTask
    });
  }

  handleNewTaskInputChange(ev) {
    let target = ev.target;
    let name = target.name;
    let value = target.value;
    let newTask = Object.assign({}, this.state.newTask);
    newTask[name] = value;
    this.setState({ newTask: newTask });
  }

  handleNewTaskSelectChange(ev, idx, value) {
    const newTask = Object.assign({}, this.state.newTask);
    newTask.type = value;
    this.setState({
      newTask: newTask
    });
  }

  handleSortOptionsSelectionChange(ev, idx, value) {
    const sortBy = value;
    this.setState({
      sortBy: sortBy
    });
  }

  handleSortOptionsToggleCompletedChange() {
    let showCompleted = !this.state.showCompleted;
    this.setState({ showCompleted: showCompleted });
  }

  toggleComplete(task) {
    let tasks = this.state.tasks.slice(0);
    let taskIdx = tasks.indexOf(task);
    tasks[taskIdx].status = tasks[taskIdx].status === 'active' ? 'closed' : 'active';
    // setTimeout(() => this.updateTask(task), 100);
    this.setState({ tasks: tasks });
  }

  addTask() {
    const newTask = Object.assign({}, this.state.newTask);
    if (!newTask.name || !newTask.type) return;
    if (!newTask.date) newTask.date = new Date();
    newTask.date = newTask.date.toISOString();
    fetch('/api/todos', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: newTask })
    })
      .then(res => res.json())
      .then(res => {
        newTask._id = res.id;
        newTask.date = new Date(newTask.date);
        const tasks = [...this.state.tasks, newTask];
        this.setState({
          tasks: tasks,
          newTask: Object.assign(newTaskTemplate)
        });
      })
      .catch(err => console.log('Error updating todo data', err));
  }

  updateTask(updatedTask) {
    console.log('ready to update task in db', updatedTask);
    fetch(`/api/todos/${updatedTask._id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: updatedTask.status })
    })
      .then(res => res.json())
      .then(res =>  console.log('updated task status in db', res))
      .catch(err => console.log('Error updating todo in db', err));
  }

  removeTask(task) {
    console.log(task);
    let tasks = this.state.tasks.slice(0);
    let taskIdx = tasks.indexOf(task);
    let removedTask = tasks[taskIdx];
    tasks.splice(tasks[taskIdx], 1);
    fetch(`/api/todos/${removedTask._id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => this.setState({ tasks: tasks }))
      .catch(err => console.log('Error deleting todo in db', err));
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

  handleJeevesNew(type, name) {
    console.log('Ready to create new,', type, 'called', name);
    let newTask = Object.assign({}, this.state.newTask);
    newTask.name = name;
    newTask.type = type;
    this.setState({ newTask: newTask });
  }

  handleJeevesDateUpdate(date) {
    console.log('Ready to update date to', date);
    let newTask = Object.assign({}, this.state.newTask);
    newTask.date = new Date(date);
    this.setState({ newTask: newTask });
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
          <h1>TASK MANAGEMENT</h1>
          <TaskSortBar
            sortBy={this.state.sortBy}
            sortOptions={this.state.sortOptions}
            showCompleted={this.state.showCompleted}
            handleSortOptionsSelectionChange={this.handleSortOptionsSelectionChange}
            handleSortOptionsToggleCompletedChange={this.handleSortOptionsToggleCompletedChange}
          />

          <TaskList
            tasks={this.state.tasks}
            sortBy={this.state.sortBy}
            showCompleted={this.state.showCompleted}
            removeTask={this.removeTask}
            toggleComplete={this.toggleComplete}
          />

          <NewTaskForm
            newTask={this.state.newTask}
            taskTypes={this.state.taskTypes}
            addTask={this.addTask}
            handleNewTaskDateChange={this.handleNewTaskDateChange}
            handleNewTaskInputChange={this.handleNewTaskInputChange}
            handleNewTaskSelectChange={this.handleNewTaskSelectChange}

            jeevesActive={this.state.jeevesActive}
            stopJeeves={this.stopJeeves}
            startJeeves={this.startJeeves}
          />

        </div>
      </Paper>
    );
  }
}

export default TMS;

// 
// 