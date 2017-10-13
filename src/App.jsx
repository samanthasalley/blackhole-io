import React from 'react';
import Canvas from './Canvas.jsx';

class App extends React.Component {
  
  constructor() {
    super();
    this.socket = io.connect('http://localhost:3000');
    this.state = {
      boxColor: 'blue'
    };
    this.updateBox = this.updateBox.bind(this);
  }

  updateBox() {
    console.log("boops");
    let newState;
    if (this.state.boxColor === 'blue') {
      newState = {boxColor: 'white'};
    } else if (this.state.boxColor === 'white') {
      newState = {boxColor: 'blue'};
    }
    console.log('sending ' + newState); 
    this.socket.emit('newColor ' + newState);

    this.setState(newState);
  }

  render() {
    return (
      <div>
        <Canvas 
        updateBox={this.updateBox}
        boxColor={this.state.boxColor}
        />
      </div>
    );
  }
}

export default App;
