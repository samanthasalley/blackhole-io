import React from 'react';
import { Switch, Route } from 'react-router-dom';
import InfiniteSpace from './InfiniteSpace.jsx';

class Telescope extends React.Component {
   render () {
      return (
        <div>  
          {/* <Route path='/InfiniteSpace' component={InfiniteSpace}/> */}
        </div>
      )
   }
}

export default Telescope;



// import React, { Component } from 'react'
// import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
// class App extends Component {
//   render() {
//     return (
//       <Router history={hashHistory}>
//         <Route path='/' component={Home} />
//         <Route path='/address' component={Address} />
//       </Router>
//     )
//   }
// }
// const Home = () => <h1>Hello from Home!</h1>
// const Address = () => <h1>We are located at 555 Jackson St.</h1>
// export default App