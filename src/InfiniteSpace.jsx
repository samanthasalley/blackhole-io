import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Canvas from './Canvas.jsx';
import Paper from 'material-ui/Paper';
import {grey300, purple50} from 'material-ui/styles/colors';

class InfiniteSpace extends React.Component {
  render() {

    const infiniteStyle = {
    height: '100%',
    width: '70%',
    margin: 20,
    backgroundColor: purple50,
    float: 'right',
    }

    return (
      <Paper style={infiniteStyle} zDepth={5}>
        <div id="canvasWrapper">
          <Canvas/>
        </div>
      </Paper>
    );
  }
}

export default InfiniteSpace;