import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch.jsx';

class Canvas extends React.Component {
  
  constructor(props) {
    super(props);
    // this.state = {
    //   mousePositions: []
    // };
    // this.updateMousePositions = this.updateMousePositions.bind(this);
  }

  // updateMousePositions() {
    
  // }

  render() {
     
    return (
      <div>    
        <P5Wrapper
        sketch={sketch} />
       
      </div>
    );
  }
}
export default Canvas;
