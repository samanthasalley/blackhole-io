import $ from 'jquery'

function submitEvent(titleNew, startDate, endDate) {

  $.ajax({
              type: "POST",
              url: "/api/cal",
              dataType: 'json',
              data: {
                    title: titleNew,
                    start: startDate,
                  //  end: endDate
              },
              success: function (data, response, event, date) {
                  //alert("success here");
                  $('#calendar').fullCalendar('renderEvent',
                  {
                      title: titleNew,
                      start: startDate,
                    //  end: endDate
                  }, true);
              },
              error: function () {
                  console.log("err: event was not posted");
              }
          });
      }

export default submitEvent;
