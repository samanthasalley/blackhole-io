import React from 'react';

export default function sketch(p) {
  let socket;
  // let mouseArr = [];
  console.log('sketch rendered');
  p.setup = function () {
    //  canvas setup
    p.createCanvas(500, 600, p.WEBGL);
    p.background(50);

    //draw what's already in database
    fetch('/api/space')
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        let {coord_x, coord_y} = data;
        for(let i = 0; i < coord_x.length; i += 1) {
          drawLine(coord_x[i], coord_y[i]);
        }
      });

    // socket listening for any broadcast 'mouse' events
    socket = io.connect('http://localhost:3000');
    socket.on('mouse', otherDrawing); //calls func when hears broadcast
  };

  function drawLine(x, y) {
    // uses x/y coords with size #/# ellipse to draw
    p.ellipse(x, y, 10, 10);
    p.noStroke();
    console.log('drawing!');

    //save to mouse position arrays
    // this.props.updatePosition([x,y]);
    // mouseArr.push([x,y]);
    // console.log(mouseArr);
  }

  // function called when socket recieves info from other users' drawing
  function otherDrawing(mousePosition) {
    let mouseX = mousePosition[0];
    let mouseY = mousePosition[1];
    drawLine(mouseX, mouseY);
  }

  // function when user creates drawing
  p.mouseDragged = function () {
    // p5-wrapper p.mouseX/Y are offset for some reason, so declaring new vars for position 
    let mouseX = p.mouseX - 250;
    let mouseY = p.mouseY - 300;

    // array to send for socket
    let mousePosition = [mouseX, mouseY];
    // emitting info to other sockets 
    console.log("sending" + mousePosition);
    socket.emit('mouse', mousePosition);
    // draw line with current x/y 
    drawLine(mouseX, mouseY);
  };
}


