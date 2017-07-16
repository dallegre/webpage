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

function Ball(damp,radius,x,y,dx,dy,ddx,ddy,fill,border) {
	
	this.damp = damp, this.radius = radius, this.x = x, this.y = y, 
	this.dx = dx, this.dy = dy, this.ddx = ddx, this.ddy = ddy,
	this.fill = fill, this.border = border,

	this.draw = function(x,y,ctx){
		ctx.beginPath();
		ctx.arc(x,y,this.radius,0,Math.PI*2);
		ctx.lineWidth = 3;
		ctx.strokeStyle = this.border;
		ctx.stroke();
		ctx.fillStyle = this.fill;
		ctx.fill();
		ctx.closePath();
	},
				  
	this.update = function(canvas){
		this.dy =  this.dy + this.ddy;
		this.y =   this.y + this.dy;
		this.ddx = -(this.dx/this.damp);
		this.dx =  this.dx + this.ddx;
		this.x =   this.x +  this.dx;
		if((this.y < this.radius) || (this.y > (canvas.height - this.radius))){
			this.dy = -this.dy;
			this.y -= 1;		//if you make the initial accel >1 this has to follow
		}
		if((this.x < this.radius) || (this.x > (canvas.width - this.radius))){
			this.dx = -this.dx;
		}
	}
		    
};

var ball1 = new Ball(150,30,canvas.width-30,30,-11,0,0,0.5,"black","white");
var ball2 = new Ball(150,50,canvas.width-50,50,-20,0,0,1,"red","black");
var ball3 = new Ball(200,20,canvas.width/2,30,30,0,0,0.8,"green","yellow");
var ball4 = new Ball(150,40,40,40,40,0,0,0.7,"blue","#7b9db7");

function draw1(){
	ctx.clearRect(0,0,canvas.width,canvas.height);  
	ball1.draw(ball1.x,ball1.y,ctx);
	ball2.draw(ball2.x,ball2.y,ctx);
	ball3.draw(ball3.x,ball3.y,ctx);
	ball4.draw(ball4.x,ball4.y,ctx);
	ball1.update(canvas);
	ball2.update(canvas);
	ball3.update(canvas);
	ball4.update(canvas);
}

setInterval(draw1, 20);
