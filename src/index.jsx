import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App.jsx';
import Cluster from './Cluster.jsx';
import InfiniteSpace from './InfiniteSpace.jsx';


document.addEventListener('DOMContentLoaded', function () {
  render(
    // <Cluster />
    <div>
      <BrowserRouter>
        <Route path='/' component={Cluster} />
      </BrowserRouter>
      <BrowserRouter>
        <Route path='/' component={InfiniteSpace} />
      </BrowserRouter>
    </div>,
    document.getElementById('root')
  );
});


{/* <Router>
      {/* <Route path='/' component={App}/> */}
{/* <Route path='/' component={Cluster}/>
      <Route path='/InfiniteSpace' component={InfiniteSpace}/>
    </Router> */}


    // <Route path='/InfiniteSpace' component={InfiniteSpace}/>
