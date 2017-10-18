import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Link } from 'react-router';

import Cluster from './Cluster.jsx';
import InfiniteSpace from './inf_space/InfiniteSpace.jsx';
import Calendar from './calendar/Calendar.jsx';
import TMS from './todo_list/TMS.jsx';


import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey300, cyan500} from 'material-ui/styles/colors';

document.addEventListener('DOMContentLoaded', function () {
  render(

   <MuiThemeProvider muiTheme={getMuiTheme()}>

    <BrowserRouter>
      <div>
           <Link to="/login">Login</Link>
        <Route path='/' component={Cluster} />
        <Route path='/inf_space/InfiniteSpace' component={InfiniteSpace} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/todo_list/tms' component={TMS} />
      </div>
    </BrowserRouter>
   </MuiThemeProvider>,
    document.getElementById('root')
  );
});
