class ArtyomCommandsManager {

  // The ArtyomCommandsManager class expects as argument in the constructor
  // an already declared instance of Artyom.js
  constructor(ArtyomInstance, props) {
    this.props = props;
    this._artyom = ArtyomInstance;
  }

  // Execute the loadCommands method to inject the methods to the instance of Artyom
  loadCommands() {
    let Artyom = this._artyom;

    // Here you can load all the commands that you want to Artyom
    return Artyom.addCommands([
      {
        indexes: ["Create new to-do *"],
        smart: true,
        action: (i, name) => {
          console.log('new todo name', name);
          Artyom.say(`Okay, I'll create a new to do called ${name}`);
          this.props.handleJeevesNew('Todo', name);
          // setTimeout(() => this.props.handleJeevesNew('Todo', name), 100);
          // this.props.stopJeeves();
        }
      },
      {
        indexes: ["Create new reminder *"],
        smart: true,
        action: (i, name) => {
          console.log('new reminder name', name);
          Artyom.say(`Okay, I'll create a new reminder called ${name}`);
          this.props.handleJeevesNew('Reminder', name);
          // setTimeout(() => this.props.handleJeevesNew('Reminder', name), 100);
          // this.props.stopJeeves();
        }
      },
      {
        indexes: ["Create new note *"],
        smart: true,
        action: (i, name) => {
          console.log('new note name', name);
          Artyom.say(`Okay, I'll create a new note called ${name}`);
          this.props.handleJeevesNew('Note', name);
          // setTimeout(() => this.props.handleJeevesNew('Note', name), 100);
          // this.props.stopJeeves();
        }
      },
      {
        indexes: ["Update due date to *"],
        smart: true,
        action: (i, date) => {
          console.log('update due date to', date);
          Artyom.say(`Okay, I'll update the due date to ${date}`);
          this.props.handleJeevesDateUpdate(date);
          // setTimeout(() => this.props.handleJeevesDateUpdate(date), 100);
          // this.props.stopJeeves();
        }
      },
      {
        indexes: ["Go to sleep Jeeves"],
        smart: false,
        action: () => {
          Artyom.say(`Goodnight!`);
          this.props.stopJeeves();
        }
      },
    ]);
  }
}

export default ArtyomCommandsManager;