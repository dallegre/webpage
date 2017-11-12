//try to do some 3d stuff
//make it theoretically correct.
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

var initDone = 0;

var clearImpulse = 1;
var mousePressed = 0;

var focalX = (4 * canvas.width) / 8;
var focalY = (2 * canvas.height) / 8;

var numX = 100;
var numY = Math.floor(numX / (1.3));

var done = 0;

var phase = 0;

var globalX =  Math.round(numX/2);
var globalY = Math.round(numY/2);

var mousePos;

//make a 3d array, indexX, indexY, XorY
var list = Array(numX);
for(i = 0; i < list.length; i++){
  list[i] = Array(numY);
  for(j = 0; j < list[i].length; j++){
    list[i][j] = Array(2);
  }
}
//make a 3d array for the previous offset
var os = Array(numX);
for(i = 0; i < os.length; i++){
  os[i] = Array(numY);
}
var osPrev = Array(numX);
for(i = 0; i < osPrev.length; i++){
  osPrev[i] = Array(numY);
}
var osOutput = Array(numX);
for(i = 0; i < osOutput.length; i++){
  osOutput[i] = Array(numY);
}
var osSwap = Array(numX);
for(i = 0; i < osSwap.length; i++){
  osSwap[i] = Array(numY);
}

//function detectLeftButton(event) {

//}

canvas.addEventListener('click', function(event){
    event = event || window.event;
    globalX = numX/2 + Math.round((event.pageX - canvas.width/2)/5);
    globalY = numY - Math.round(event.pageY / 5);
    //alert("X is " + globalX + " and Y is " + globalY);
    mousePressed = 1;
}, false);

//calculate the overall change in width in the x direction in the canvas
//divide the overall change by the number of step sizes in the y dimension
//this gives you the amount of change to scale the y dimension by
var gridWidth =     2.3 * canvas.width;
var offsetLeft =  - canvas.width / 2;
var offsetBottom =  canvas.height * 6/8;

var gridHeight =    Math.abs(focalY - offsetBottom) * 2/3;
var slope1 =        (offsetBottom - focalY) / (focalX - offsetLeft);    //+ is when the focal point is to the right of the left side of the grid
var slope2 =        (offsetBottom - focalY) / (offsetLeft + gridWidth - focalX);   //+ is when the focal point is the left side of the grid
var deltaX1 =       gridHeight / slope1;
var deltaX2 =       gridHeight / slope2;
var topWidth =      gridWidth - deltaX1 - deltaX2;

var globalDelta =   topWidth / gridWidth / numY;

//alert(globalDelta);				//good debugging technique...

function makeGrid(x,y){
  
  //calculate points
  for(j = 0; j < numY; j++){
    if(j == 0){
      //split out the first row so you can use it for calculating column lines for subsequent rows.
      for(i = 0; i < numX; i++){
        list[i][j][0] = ( (i / numX) * gridWidth) + offsetLeft;
        list[i][j][1] = canvas.height;
      }
    }
    else{
      for(i = 0; i < numX; i++){
        //formula will be current line width divided by gridWidth
        var scaling = (gridWidth - (gridWidth * (numY - j) * globalDelta)) / gridWidth;
        //top offset + size * proportion ** shaping
        list[i][j][1] = offsetBottom - ( gridHeight * (j/numY) / Math.pow(scaling, 2));
        //after y is cacluated, get x from y=m*x+b between the focal point and the lowest point on the column
        list[i][j][0] = ((list[i][j][1] - focalY) / ((focalY - list[i][0][1]) / (focalX - list[i][0][0]))) + focalX;
      	//make initial conditions for the offset function
        os[i][j] = 0;
        osPrev[i][j] = 0;
        osOutput[i][j] = 0;
      }
    }
  }
}

function updateGrid(x,y){

   for(j = 0; j < numY; j++){
       for(i = 0; i < numX; i++){
        if((i > 1) && (i < numX-1) && (j > 1) && (j < numY-1)){
          var randerm = Math.random() * (3) + 1;
          osOutput[i][j] = ((os[i+1][j+1]/randerm + os[i+1][j-1]/randerm + os[i-1][j+1]/randerm + os[i-1][j-1]/randerm + os[i+1][j] + os[i-1][j] + os[i][j+1] + os[i][j-1]) / 4) - osPrev[i][j]; 
        }
        
        if(clearImpulse == 0){
          if((i == x) && (j == y)){
          var impulseScaling = (gridWidth - (gridWidth * (y - j) * globalDelta)) / gridWidth;
        	  os[i][j] -= 50 / impulseScaling;;
            clearImpulse = 1;
            mousePressed = 0;
          }
        }
        if(mousePressed == 1){
          if((i == x) && (j == y)){
            var impulseScaling = (gridWidth - (gridWidth * (y - j) * globalDelta)) / gridWidth;
        	  os[i][j] = 50 / impulseScaling;
            clearImpulse = 0;
          }       
        }
      }
    }
    
   for(j = 0; j < numY; j++){  
     for(i = 0; i < numX; i++){
          var osScaling = (gridWidth - (gridWidth * (numY - j) * globalDelta)) / gridWidth;
          list[i][j][1] += 10 * (osOutput[i][j] - osPrev[i][j])/osScaling;
          osPrev[i][j] = osOutput[i][j] * .95;
          osSwap[i][j] = os[i][j];
          os[i][j] = osPrev[i][j];
          osPrev[i][j] = osSwap[i][j];
     }
   }
 
  //do drawing
  for(j = 0; j < numY; j++){
    for(i = 0; i < numX; i++){
      if((i > 1) && (i < numX-1) && (j > 1) && (j < numY-1)){
        ctx.beginPath();
        ctx.arc(list[i][j][0], list[i][j][1], 1 * Math.pow(((numY-j)/numY),2), 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  }
  
}

function draw(){
  if(initDone == 0){
  	makeGrid(globalX, globalY);
 	initDone = 1;
  }
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle = "#bcf2c6";
  updateGrid(globalX, globalY);
}

//10ms frame interval
setInterval(draw, 50);
