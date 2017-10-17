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
        indexes: ["Hello", "Hi"],
        action: () => {
          Artyom.say("Hello, how are you?");
        }
      },
      {
        indexes: [/How are you/, /Regular expressions supported/],
        smart: true,
        action: () => {
          Artyom.say("I'm fine, thanks for asking !");
        }
      },
      {
        indexes: ["Generate reports of * of this year"],
        smart: true,
        action: (i, month) => {
          let year = new Date().getFullYear();

          Artyom.say(`Generating reports of ${month} ${year} `);

          Artyom.say("Ready ! What were you expecting? write some code you lazy bear !");
        }
      },
      {
        indexes: ["Create new item *"],
        smart: true,
        action: (i, name) => {
          console.log('new item name', name);
          Artyom.say(`Okay, I'll create a new item called ${name}`);
          setTimeout(() => this.props.handleNewItem(name), 100);
          this.props.stopJeeves();
        }
      },
    ]);
  }
}

export default ArtyomCommandsManager;