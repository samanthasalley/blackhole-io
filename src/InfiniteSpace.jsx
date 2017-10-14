import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class InfiniteSpace extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div id="canvasWrapper"></div>
      </MuiThemeProvider>
    )
  }
}

export default InfiniteSpace;