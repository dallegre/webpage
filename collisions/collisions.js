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
 			//see if it will still be out of bounds next iteration
      if((this.y+this.dy) < this.radius){
      	//if it will be, apply some extra motion to get it unstuck
        this.y = this.radius + 1;
      }
      if((this.y+this.dy) > (canvas.height - this.radius)){
      	this.y = canvas.height - this.radius - 1;
      }
    }
    if((this.x < this.radius) || (this.x > (canvas.width - this.radius))){
      this.dx = -this.dx;
      //check to see if it will be out of bounds next iteration
      if((this.x+this.dx) < this.radius){
      	//if it will be, apply some extra motion to get it unstuck
        this.x = this.radius + 1;
      }
      if((this.x+this.dx) > (canvas.width - this.radius)){
      	this.x = canvas.width - this.radius - 1;
      }
    }
  }
  
};

function collisionDetect(ball1,ball2){
  //do an AABB check on the balls to see if they are near to one another
  if(ball1.x + ball1.radius + ball2.radius > ball2.x 
  && ball1.x < ball2.x + ball1.radius + ball2.radius	
  && ball1.y + ball1.radius + ball2.radius > ball2.y 
  && ball1.y < ball2.y + ball1.radius + ball2.radius){
    //pythagorean theorem for a more expensive look at whether they're colliding
    //var distance = Math.sqrt((ball1.x-ball2.x)*(ball1.x-ball2.x) + (ball1.y-ball2.y)*(ball1.y-ball2.y));
		var distance = Math.sqrt(((ball1.x+ball2.dx)-(ball2.x+ball2.dx))*((ball1.x+ball1.dx)-(ball2.x+ball2.dx)) + ((ball1.y+ball1.dy)-(ball2.y+ball2.dy))*((ball1.y+ball1.dy)-(ball2.y+ball2.dy)));
		
    if(distance < (ball1.radius + ball2.radius)){
    
      //add some damping or else it goes crazy
      var damping = .75;
      
      //do some math
      var vecx = Math.abs(ball1.x - ball2.x)/distance;
      var vecy = Math.abs(ball1.y - ball2.y)/distance;
      
      var dxprev1 = ball1.dx;
      var dyprev1 = ball1.dy;
      var dxprev2 = ball2.dx;
      var dyprev2 = ball2.dy;
			///*
      //if(ball1.x+ball1.dx > ball2.x+ball2.dx){
      if(ball1.x > ball2.x){
      	ball1.dx = dxprev2*damping - vecy*dyprev2*damping/1.5;
      	ball2.dx = dxprev1*damping + vecy*dyprev1*damping/1.5;
      }else{
      	ball1.dx = dxprev2*damping + vecy*dyprev2*damping/1.5;
      	ball2.dx = dxprev1*damping - vecy*dyprev1*damping/1.5;
			}
      //if(ball1.y+ball1.dy > ball2.y+ball2.dy){
      if(ball1.x > ball2.x){
      	ball1.dy = dyprev2*damping + vecx*dxprev2*damping/1.5;
      	ball2.dy = dyprev1*damping - vecx*dxprev1*damping/1.5;
      }else{
      	ball1.dy = dyprev2*damping - vecx*dxprev2*damping/1.5;
      	ball2.dy = dyprev1*damping + vecx*dxprev1*damping/1.5;      
      }
			//*/
      /*
     // works decently well...
      ball1.dx = dxprev2;
      ball1.dy = dyprev2;
      ball2.dx = dxprev1;
      ball2.dy = dyprev1;
			*/

			for(var i = 0; i < 10; i++){
        //recalculate distance
        distance = Math.sqrt(((ball1.x+ball1.dx)-(ball2.x+ball2.dx))*
        ((ball1.x+ball1.dx)-(ball2.x+ball2.dx)) + 
        ((ball1.y+ball1.dy)-(ball2.y+ball2.dy))*
        ((ball1.y+ball1.dy)-(ball2.y+ball2.dy)));

        //see if they will still be colliding next iteration
        if(distance < (ball1.radius + ball2.radius)){
          ball1.x = ball1.x + ball1.dx*2;
          ball1.y = ball1.y + ball1.dy*2;
          ball2.x = ball2.x + ball2.dx*2;
          ball2.y = ball2.y + ball2.dy*2;
        }
      }
    
    }
	}
}

function randint(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var ball1 = new Ball(150,30,canvas.width-50,canvas.height/2+20,-11,0,0,0.5,"black","black");
var ball2 = new Ball(200,20,40,canvas.height/2,10,0,0,0.4,"green","yellow");
var ball3 = new Ball(100,50,30,40,randint(1,15),0,0,0.3,"red","black");
var ball4 = new Ball(200,40,canvas.width-50,randint(40,200),randint(5,15),0,0,0.3,"yellow","black");
var ball5 = new Ball(100,30,canvas.width/2,300,randint(-5,-15),0,0,0.3,"blue","black");

function draw(){

  //to have some trailers after ball
  ctx.globalAlpha = 1;
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,canvas.width,canvas.height);  
  ctx.globalAlpha = .8;
  


  ball1.draw(ball1.x,ball1.y,ctx);
  ball2.draw(ball2.x,ball2.y,ctx);
  ball3.draw(ball3.x,ball3.y,ctx);
  ball4.draw(ball4.x,ball4.y,ctx); 
  ball5.draw(ball5.x,ball5.y,ctx); 

	ball1.update(canvas);
  ball2.update(canvas);
  ball3.update(canvas);
  ball4.update(canvas);
  ball5.update(canvas);

  collisionDetect(ball1,ball2);
  collisionDetect(ball1,ball3);
  collisionDetect(ball1,ball4);
  collisionDetect(ball1,ball5);
  collisionDetect(ball2,ball3);
  collisionDetect(ball2,ball4);
  collisionDetect(ball2,ball5);
  collisionDetect(ball3,ball4); 
  collisionDetect(ball3,ball5);
  collisionDetect(ball4,ball5);

}

setInterval(draw, 15);
