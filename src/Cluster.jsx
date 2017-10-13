import React from 'react';
import { Link } from 'react-router-dom';

class Cluster extends React.Component {
  constructor() {
    super();
    
  }
   render () {
      return (
        // <button is="clusterButton">Hello</button>
          <div id="clusterWrapper">
            <nav>
               <ul>
                <li><Link to='/InfiniteSpace'>Infinite Space</Link></li>
                <li><Link to='/calendar'>Calendar</Link></li>
                <li><Link to='/tms'>TMS</Link></li>
               </ul>
             </nav>
          </div>
      )
   }
}

export default Cluster;