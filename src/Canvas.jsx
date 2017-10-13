import React from 'react';


class Canvas extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div id="testbox" style={{backgroundColor: this.props.boxColor}} onClick={this.props.updateBox}>     
      </div>
    );
  }
}
export default Canvas;
