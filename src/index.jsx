import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Cluster from './Cluster.jsx';
import InfiniteSpace from './InfiniteSpace.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey300, cyan500} from 'material-ui/styles/colors';
// import injectTapEventPlugin from 'react-tap-event-plugin';


// const muiTheme = getMuiTheme({
//   palette: {
//     textColor: cyan500,
//   },
//   appBar: {
//     color: grey300,
//     textColor: cyan500,
//     backgroundColor: cyan500,
//     height: 500
//   },
// });

document.addEventListener('DOMContentLoaded', function () {
  render(
   
   <MuiThemeProvider muiTheme={getMuiTheme()}> 
    <BrowserRouter>
      <div>
          <Route path='/' component={Cluster} />
          <Route path='/InfiniteSpace' component={InfiniteSpace} />
      </div>
    </BrowserRouter>
   </MuiThemeProvider>,
    document.getElementById('root')
  );
});
