import React from 'react';
import Paper from 'material-ui/Paper';
import {grey300, purple50} from 'material-ui/styles/colors';

class Login extends React.Component {

  render() {
     const logStyle = {
       height: '100%',
       width: '100%',
       backgroundColor: purple50,
       position: 'fixed',
       border:'1em solid black',
       margin:'em -10em -7em -2em'
     }

     const signin = {
       width:'16em',
       height:'4em',
       left:'50%',
       top:'50%',
       transform: 'translate(-50%,-50%)',
       position:'fixed',
       backgroundColor:'black'
     }

     const bgroundStyle = {

       width:'34%',
       height:'25%',
       left:'50%',
       top:'50%',
       transform: 'translate(-50%,-50%)',
       position:'fixed',
   background: 'url(./blogin.png)'
     }

     return (
       <Paper id="logPage" style={logStyle} zDepth={1}>
         <div style={bgroundStyle} >
         <button style={signin} id="signinButton">
           <img src="./google_button.png" width="100%" height="100%"/>
         </button>
       </div>
       </Paper>
     )}

componentDidMount() {
   $('#signinButton').click(function() {
    auth2.grantOfflineAccess().then(signInCallback);
  });
  function signInCallback() {
      $('#logPage').attr('style', 'display:none');
    }
  }

}
export default Login;
