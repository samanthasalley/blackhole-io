import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
        <Cluster /> 
        <Switch>
          <Route exact path='/space' component={InfiniteSpace} />
          <Route exact path='/calendar' component={Calendar} />
          <Route exact path='/tasks' component={TMS} />
        </Switch>
      </div>
    </BrowserRouter>
   </MuiThemeProvider>,
    document.getElementById('root')
  );
});
