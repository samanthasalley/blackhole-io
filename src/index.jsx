import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Cluster from './Cluster.jsx';
import InfiniteSpace from './InfiniteSpace.jsx';
import Calendar from './Calendar.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey300, cyan500} from 'material-ui/styles/colors';
import TMS from './TMS.jsx';

document.addEventListener('DOMContentLoaded', function () {
  render(
   
   <MuiThemeProvider muiTheme={getMuiTheme()}> 
    <BrowserRouter>
      <div>
        <Route path='/' component={Cluster} />
        <Route path='/InfiniteSpace' component={InfiniteSpace} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/tms' component={TMS} />
      </div>
    </BrowserRouter>
   </MuiThemeProvider>,
    document.getElementById('root')
  );
});
