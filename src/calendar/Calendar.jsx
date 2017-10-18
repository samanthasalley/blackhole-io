import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import {grey300, purple50} from 'material-ui/styles/colors';

import $ from 'jquery';
import moment from 'moment';
import fullcalendar from 'fullcalendar';
import submitEvent from './submitEvent.jsx'

class Calendar extends React.Component {

  render() {
      const styles = {
        marginTop:'2em',
          width:'70%',
          height:'89%',
          backgroundColor:'white',
          float :'left',

        }
        const clickStyles = {
          textAlign: 'center',
            width:'14em',
            height:'5em',
            position:'absolute',
            display:'none',
            zIndex:'1',
            backgroundColor:'white',
            border: '1px solid gray'
        }
        const inputStyles = {
          textAlign:'center',
          marginTop: '.5em',
          width:'13em'
        }

      return (
        <Paper>
          <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.7.1/fullcalendar.min.css'/>
          <div style={styles} id="calendar">
          </div>
          <div style={clickStyles} id="clickEvent"><input id="eventInput" style={inputStyles} placeholder="enter new event"/></div>
        </ Paper> )
    }
    componentDidMount() {

      $('#calendar').fullCalendar({
  			header: {
  				left: 'prev,next today',
  				center: 'title',
  				right: 'month,agendaWeek,agendaDay'
  			},
        dayClick: function(date, jsEvent, view) {

            $("#clickEvent").css("left",jsEvent.pageX);
            $("#clickEvent").css("top",jsEvent.pageY)
            $("#clickEvent").show();
            $('#eventInput').keypress(function(e) {
              if(e.which == 13) {
                 submitEvent($('#eventInput').val(),date.format());
                 $('#eventInput').val("");
                 $('#clickEvent').css('display','none');
               }
            })
          }

          ,
          events: {
            url: '/api/cal',
            error: function() {
                console.log('error fetching events');
            },
            success: function(){
                console.log("success!");
            },
        },
        eventClick: function(event){
          $('#calendar').fullCalendar('removeEvents',event._id);
        },
        //events: event_array,
  			editable: true,
  			droppable: true, // this allows things to be dropped onto the calendar
  			drop: function() {
  				// is the "remove after drop" checkbox checked?
  				if ($('#drop-remove').is(':checked')) {
  					// if so, remove the element from the "Draggable Events" list
  					$(this).remove();
  				}
  			}
      })
    }
  }

export default Calendar;
