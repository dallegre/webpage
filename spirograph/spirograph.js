var parentdiv = document.getElementById("pageBody");

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width = parentdiv.clientWidth;
canvas.height = parentdiv.clientHeight;

var backButton = document.getElementById("backButton");
var backButtonText = document.getElementById("backButtonText");

window.onload = function(){
  backButton.className = "opaque";
  backButtonText.className = "opaque"; 
};

var color = 0xffffff;

//initial position of the 4 points
var index1 = 0;
var index2 = 20;
var index3 = 40;
var index4 = 40;

//change the angle resolution.
//Values between 1 and 2 are cool.
var resolution = 1;

//set rotational velocity of each of the 4 points
var speed1 = 1;
var speed2 = 2;
var speed3 = 4;
var speed4 = 8;

//draw polygon between the 4 points on a circle
function drawPolygon(index1, index2, index3, index4){

  var radius = canvas.width / 2;
  var centerx = canvas.width / 2;
  var centery = canvas.height / 2;
  
  //polar coordinates:
  //according to sohcahtoa, y = r*sin(theta), x = r*cos(theta)
  //increment theta
  //find the 4 points
  var theta1 = (Math.PI / (40 * resolution)) * index1;
  var x1 = Math.sin(theta1) * radius + centerx;
  var y1 = Math.cos(theta1) * radius + centery;
  
  var theta2 = (Math.PI / (40 * resolution)) * index2;
  var x2 = Math.sin(theta2) * radius + centerx;
  var y2 = Math.cos(theta2) * radius + centery;
  
  var theta3 = (Math.PI / (40 * resolution)) * index3;
  var x3 = Math.sin(theta3) * radius + centerx;
  var y3 = Math.cos(theta3) * radius + centery;
 
  var theta4 = (Math.PI / (40 * resolution)) * index4;
  var x4 = Math.sin(theta4) * radius + centerx;
  var y4 = Math.cos(theta4) * radius + centery;
  
  //draw the shape
  ctx.beginPath();
  ctx.arc(x1, y1, 1, 0, 2 * Math.PI);
  ctx.arc(x2, y2, 1, 0, 2 * Math.PI);
  ctx.arc(x3, y3, 1, 0, 2 * Math.PI);
  ctx.arc(x4, y4, 1, 0, 2 * Math.PI);
  ctx.arc(x1, y1, 1, 0, 2 * Math.PI);
  ctx.stroke();

}

function draw(){

   ctx.globalAlpha = 0.0;
   ctx.fillStyle = "black";
   ctx.fillRect(0,0,canvas.width,canvas.height);
   ctx.globalAlpha = 0.07;
   //color = color - 20;
   ctx.strokeStyle = "white";

  //draw the thing
  drawPolygon(index1, index2, index3, index4);
  
  //update angles
  index1 = index1 + speed1;
  if(index1 > (80 * resolution)){
    index1 = 0;
  }
  index2 = index2 + speed2;
  if(index2 > (80 * resolution)){
    index2 = 0;
  }
  index3 = index3 + speed3;
  if(index3 > (80 * resolution)){
    index3 = 0;
  }
  index4 = index4 + speed4;
  if(index4 > (80 * resolution)){
    index4 = 0;
  }
  
}

//10ms frame interval
setInterval(draw, 10);
