var canvas = document.getElementById("myCanvas");
var parentdiv = document.getElementById("pageBody");
var ctx = canvas.getContext("2d");

canvas.width = parentdiv.clientWidth;
canvas.height = parentdiv.clientHeight;

var backButton = document.getElementById("backButton");
var backButtonText = document.getElementById("backButtonText");

window.onload = function(){
  backButton.className = "opaque";
  backButtonText.className = "opaque"; 
};

//position
var x = 40;
var y = 40;

//velocity (set initial velocity here)
var dx = 60;
var dy = 0;

//acceleration 
var ddx = 0;
var ddy = 0;

//gravity constants
var mass = 1;
var forcey = 0;

//x axis damping.  higher means less damping
var damp = 100;

var ballRadius = 40;

function drawBall(){
  ctx.beginPath();
  ctx.arc(x,y,ballRadius,0,Math.PI*2);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#bce0d9";
  ctx.stroke();
  ctx.fillStyle = "#bce0d9";
  ctx.fill();
  ctx.closePath();
}

function draw(){

  //to have no trailers after ball
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  //to have some trailers after ball
  //ctx.globalAlpha = 0.005;
  //ctx.fillRect(0,0,canvas.width,canvas.height);
  //ctx.globalAlpha = 0.5;

  //draw the ball
  drawBall();

  //abstract out the 9.81 meters per sec squared
  forcey = mass;
  //f=ma
  ddy = forcey/mass;
  //find velocity from acceleration
  dy = dy + ddy;
  //position from velocity
  y = y + dy;
  
  //make damping deceleration dependent on x axis velocity
  ddx = -(dx/damp);
  //velocity from acceleration
  dx = dx + ddx;
  //position from velocity
  x = x + dx;
  
  //check for boundary collision
  if((y < ballRadius) || (y > (canvas.height - ballRadius))){
  	dy = -dy+0.1;
    //keeps it from running to the bottom of the screen...
    y -= 1;
  }
  if((x < ballRadius) || (x > (canvas.width - ballRadius))){
    dx = -dx;
  }
  
}

setInterval(draw, 30);
