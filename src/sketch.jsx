import React from 'react';

export default function sketch (p) {

  let socket;

   p.setup = function () {
     p.createCanvas(600, 400, p.WEBGL);
     p.background(50);
     socket = io.connect('http://localhost:3000');
     socket.on('mouse', newDrawing);
   };

  function newDrawing(mousePosition) {
    let mouseX = mousePosition.x;
    let mouseY = mousePosition.y;
    p.ellipse(mouseX, mouseY, 10, 10);
    p.noStroke();
  }

   p.mouseDragged = function () {
    // p5-wrapper p.mouseX/Y are offset for some reason, so declaring new vars for position 
    let mouseX = p.mouseX -300;
    let mouseY = p.mouseY -195;

    // create array holding current coordinates 
    let mousePosition = {
      x: mouseX,
      y: mouseY
    }
    console.log("sending" + mousePosition);

    socket.emit('mouse', mousePosition);
    //draw at coordinates with size #,# size ellipse 
    p.ellipse(mouseX, mouseY, 10, 10);
    p.noStroke(); //makes stroke white somehow
    // push and pop don't seem to do anything?
    // p.push();
    // p.pop();
   };
   

};


