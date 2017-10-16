import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import Canvas from './Canvas.jsx';
import Paper from 'material-ui/Paper';
import {grey300, purple50} from 'material-ui/styles/colors';

class Calendar extends React.Component {
  render() {

    const infiniteStyle = {
    height: '100%',
    width: '70%',
    margin: 20,
    backgroundColor: purple50,
    float: 'left',
    }

    return (
      <Paper style={infiniteStyle} zDepth={5}>
      <div id="TMS">
      <h1>CALENDAR</h1>
      </div>
      </Paper>
    );
  }
}

export default Calendar;
