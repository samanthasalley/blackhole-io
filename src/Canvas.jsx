import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch.jsx';

class Canvas extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      mousePosition: []
    };
    this.saveBoard = this.saveBoard.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  saveBoard() {
    
  }

  clearBoard() {

  }

  updatePosition(position) {
    setState({ mousePosition: position });
    console.log(this.mousePosition);
  }

  render() {
     
    return (
      <div>    
        <P5Wrapper
        updatePosition={this.updatePosition}
        mousePosition={this.state.mousePosition} 
        sketch={sketch} />
        <button onClick={this.saveBoard}>Save Infinite Space</button>
        <button>Clear Infinite Space</button>
      </div>
    );
  }
}
export default Canvas;
