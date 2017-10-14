import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Cluster from './Cluster.jsx';
import InfiniteSpace from './InfiniteSpace.jsx';
import TMS from './TMS.jsx';

document.addEventListener('DOMContentLoaded', function () {
  render(
    <BrowserRouter>
      <div>
        <Route path='/' component={Cluster} />
        <Route path='/InfiniteSpace' component={InfiniteSpace} />
        <Route path='/tms' component={TMS} />
      </div>
    </BrowserRouter>,
    document.getElementById('root')
  );
});
