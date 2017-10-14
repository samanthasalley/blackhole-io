import React from 'react';

export default function sketch (p) {
  let socket;
  let mouseArrX = [];
  let mouseArrY = [];

   p.setup = function () {
    //  canvas setup
     p.createCanvas(600, 400, p.WEBGL);
     p.background(50);
    // socket listening for any broadcast 'mouse' events
     socket = io.connect('http://localhost:3000');
     socket.on('mouse', otherDrawing); //calls func when hears broadcast
   };

  function drawLine(x,y) {
    // uses x/y coords with size #/# ellipse to draw
    p.ellipse(x, y, 10, 10);
    p.noStroke();

    //save to mouse position arrays
    mouseArrX.push(x);
    mouseArrY.push(y);
    console.log(mouseArrX);
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
    let mouseX = p.mouseX -300;
    let mouseY = p.mouseY -195;

    // array to send for socket
    let mousePosition = [mouseX, mouseY];
    // emitting info to other sockets 
    console.log("sending" + mousePosition);
    socket.emit('mouse', mousePosition);
    // draw line with current x/y 
    drawLine(mouseX, mouseY);
   };


  //  return (
  //   <button> Boo </button>
  //  );
  

};


