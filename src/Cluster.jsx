import React from 'react';
import { Link } from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import {grey300, purple50} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Create from 'material-ui/svg-icons/content/create';

class Cluster extends React.Component {
  constructor() {
    super();

  }

  render() {

    const clusterStyle = {
    height: '100%',
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    backgroundColor: purple50,
  }

  const linkStyle = {
    height: 40,
    width: 40,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    paddingTop: 8,
    backgroundColor: purple50
  }

   
    return (
      // <div id="clusterWrapper">
        <Paper style={clusterStyle} zDepth={5}>
        <nav>
          <ul>
          <Paper style={linkStyle} zDepth={1}>
            <Link to='/InfiniteSpace'><Create/></Link>
          </Paper>
          <br></br>
            <Link to='/calendar'>Calendar</Link>
            <Link to='/tms'>TMS</Link>
          </ul>
        </nav>
       </Paper>
    )
  }
}

export default Cluster;