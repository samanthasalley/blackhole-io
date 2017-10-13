import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Cluster from './Cluster.jsx';
import InfiniteSpace from './InfiniteSpace.jsx';


document.addEventListener('DOMContentLoaded', function () {
  render(
    <BrowserRouter>
      <div>
        <Route path='/' component={Cluster} />
        <Route path='/InfiniteSpace' component={InfiniteSpace} />
      </div>
    </BrowserRouter>,
    document.getElementById('root')
  );
});
