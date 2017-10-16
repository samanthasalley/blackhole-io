import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch.jsx';
import RaisedButton from 'material-ui/RaisedButton';

class Canvas extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mousePosition: [],
      reRender: 0
    };
    this.saveBoard = this.saveBoard.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  saveBoard() {
    fetch('/api/update/space', {
      method: 'post',
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
    });
  }


  clearBoard = () => {
    this.setState({reRender: ++this.state.reRender})
    fetch('/api/clear/space', {
      method: 'post',
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log('clearBoard called')
      console.log(data);
      // hack to make component re-render since the status of the board is not being held in state
      this.setState({reRender: ++this.state.reRender})
      // console.log(this.state)
    });
  }

  updatePosition(position) {
    setState({ mousePosition: position });
    console.log(this.mousePosition);
  }

  render() {

    return (
      <div id="canvas">
        <P5Wrapper
          sketch={sketch}
        />
          <RaisedButton className="canvas-button" label="Save" primary={true} onClick={this.saveBoard} />
          <RaisedButton className="canvas-button" label="Clear" primary={true} onClick={this.clearBoard} />
      </div>
    );
  }
}
export default Canvas;
