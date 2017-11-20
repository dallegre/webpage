//apply lowpass filtering to an object's position
var canvas = document.getElementById("myCanvas");
var parentdiv = document.getElementById("pageBody");
var ctx = canvas.getContext("2d");

canvas.width = parentdiv.clientWidth;
canvas.height = parentdiv.clientHeight;

var mousePos;

var globalx = canvas.width / 2;
var globaly = canvas.height / 2;

var backButton = document.getElementById("backButton");
var backButtonText = document.getElementById("backButtonText");
var expButton = document.getElementById("expButton");
var expButtonText = document.getElementById("expButtonText");

window.onload = function(){
  backButton.className = "opaque";
  backButtonText.className = "opaque"; 
  expButton.className = "opaque";
  expButtonText.className = "opaque"; 
};

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function Tracer(radius, cutoff, canvas){			//10 to 30 is a good "cutoff" (higher is lower)
  this.mousexprev = canvas.width / 2;
  this.mouseyprev = canvas.width / 2;
  this.mousexcurrent = canvas.width / 2;
  this.mouseycurrent = canvas.width / 2;
  this.coeff1 = 1 / cutoff;
  this.coeff2 = (cutoff - 1) / cutoff;
  this.radius = radius;
  
  this.update = function(ctx, x, y, color){
    this.mousexcurrent = x;
    this.mouseycurrent = y;
    this.mousexcurrent = this.mousexcurrent * this.coeff1 + this.mousexprev * this.coeff2;
    this.mouseycurrent = this.mouseycurrent * this.coeff1 + this.mouseyprev * this.coeff2;
    this.mousexprev = this.mousexcurrent;
    this.mouseyprev = this.mouseycurrent;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(this.mousexcurrent, this.mouseycurrent, this.radius, 0, 2*Math.PI);
    ctx.stroke();    
    ctx.closePath();
	ctx.fillStyle = color;
	ctx.fill();
  }

}


canvas.addEventListener('mousemove', function(evt) {
  mousePos = getMousePos(canvas, evt);
  globalx = mousePos.x;
  globaly = mousePos.y;
}, false);

list = [];

for(i = 1; i < 12; i++){
  //worm mode
  list[i] = new Tracer(((12-i)*10) ** 1.65, (12-i) ** 1.5, canvas);
  //slinky mode
  //list[i] = new Tracer(30, i ** 1, canvas);
}

function draw(){

  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  for(i = 1; i < 12; i++){
	if(i % 2 == 1){
		color = "white";
	}else{
		color = "green";
	}
  	list[i].update(ctx, globalx, globaly,color, color);
  }
  
}

//10ms frame interval
setInterval(draw, 40);
