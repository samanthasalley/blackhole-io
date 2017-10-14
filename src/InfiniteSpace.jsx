import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Canvas from './Canvas.jsx';

class InfiniteSpace extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div id="canvasWrapper">
          <Canvas/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default InfiniteSpace;