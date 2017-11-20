var upperSquare1 =  document.getElementById("upperSquare1");
var upperSquare2 =  document.getElementById("upperSquare2");
var upperSquare3 =  document.getElementById("upperSquare3");
var upperSquare4 =  document.getElementById("upperSquare4");
var upperSquare5 =  document.getElementById("upperSquare5");

var middleSquare1 = document.getElementById("middleSquare1");
var middleSquare2 = document.getElementById("middleSquare2");
var middleSquare3 = document.getElementById("middleSquare3");
var middleSquare4 = document.getElementById("middleSquare4");

var lowerSquare1 =  document.getElementById("lowerSquare1");
var lowerSquare2 =  document.getElementById("lowerSquare2");
var lowerSquare3 =  document.getElementById("lowerSquare3");


var upperSquare1Text =  document.getElementById("upperSquare1Text");
var upperSquare2Text =  document.getElementById("upperSquare2Text");
var upperSquare3Text =  document.getElementById("upperSquare3Text");
var upperSquare4Text =  document.getElementById("upperSquare4Text");
var upperSquare5Text =  document.getElementById("upperSquare5Text");

var middleSquare1Text = document.getElementById("middleSquare1Text");
var middleSquare2Text = document.getElementById("middleSquare2Text");
var middleSquare3Text = document.getElementById("middleSquare3Text");
var middleSquare4Text = document.getElementById("middleSquare4Text");

var lowerSquare1Text =  document.getElementById("lowerSquare1Text");
var lowerSquare2Text =  document.getElementById("lowerSquare2Text");


var textstuff =   document.getElementById("textstuff");
var textstuff2 =  document.getElementById("textstuff2");

//Initial page loading stuff.  First make the squares go to the center of the window
window.onload = function(){
	upperSquare1.className = "square inside";
	middleSquare1.className = "square inside";
	lowerSquare1.className =  "square inside";
};
//Then make the labels show up on the suqares.
upperSquare1.addEventListener("transitionend", function(){
	upperSquare1Text.className = "squareText textOpaque";
	middleSquare1Text.className = "squareText textOpaque";
	lowerSquare1Text.className = "squareText textOpaque";
	textstuff.className = "opaque";
	textstuff2.className = "opaque";
},true);
textstuff.addEventListener("transitionend", function(){
	//textstuff2.className = "opaque";
},true);

//Now handle the mouse clicks.
upperSquare1.addEventListener("click",function(){
	if(upperSquare2.className == "square out"){
		upperSquare2.className = "square in";
		upperSquare3.className = "square in";
		upperSquare4.className = "square in";
		upperSquare5.className = "square in";
		upperSquare2Text.className = "squareText textTrans";
		upperSquare3Text.className = "squareText textTrans";
		upperSquare4Text.className = "squareText textTrans";
		upperSquare5Text.className = "squareText textTrans";
	}else{
		upperSquare2.className = "square out";
		upperSquare3.className = "square out";
		upperSquare4.className = "square out";
		upperSquare5.className = "square out";
		upperSquare2Text.className = "squareText textOpaque";		//if you want the text to show up right away, make these "squareText"
		upperSquare3Text.className = "squareText textOpaque";
		upperSquare4Text.className = "squareText textOpaque";
		upperSquare5Text.className = "squareText textOpaque";
	}
},false);
//After a click and transition, make the text appear on the submenu squares.
upperSquare2.addEventListener("transitionend", function(){
	if(upperSquare2.className == "square out"){
	  upperSquare2Text.className = "squareText textOpaque";
	  upperSquare3Text.className = "squareText textOpaque";
	  upperSquare4Text.className = "squareText textOpaque";
	  upperSquare5Text.className = "squareText textOpaque";
	}else{
	  upperSquare2Text.className = "squareText";
	  upperSquare3Text.className = "squareText";
	  upperSquare4Text.className = "squareText";
	  upperSquare5Text.className = "squareText";
	}
},true);	


middleSquare1.addEventListener("click",function(){
	if(middleSquare2.className == "square out"){
		middleSquare2.className = "square in";
		middleSquare3.className = "square in";
		middleSquare4.className = "square in";
		middleSquare2Text.className = "squareText textTrans";
		middleSquare3Text.className = "squareText textTrans";
		middleSquare4Text.className = "squareText textTrans";
	}else{
		middleSquare2.className = "square out";
		middleSquare3.className = "square out";
		middleSquare4.className = "square out";
		middleSquare2Text.className = "squareText textOpaque";
		middleSquare3Text.className = "squareText textOpaque";
		middleSquare4Text.className = "squareText textOpaque";
	}
},false);
middleSquare2.addEventListener("transitionend", function(){
	if(middleSquare2.className == "square out"){
	  middleSquare2Text.className = "squareText textOpaque";
	  middleSquare3Text.className = "squareText textOpaque";
	  middleSquare4Text.className = "squareText textOpaque";
	}else{
	  middleSquare2Text.className = "squareText";
	  middleSquare3Text.className = "squareText";
	  middleSquare4Text.className = "squareText";
	}
},true);	


lowerSquare1.addEventListener("click",function(){
	if(lowerSquare2.className == "square out"){
		lowerSquare2.className = "square in";
	  	lowerSquare2Text.className = "squareText textTrans";
	}else{
		lowerSquare2.className = "square out";
	  	lowerSquare2Text.className = "squareText textOpaque";
	}
},false);
lowerSquare2.addEventListener("transitionend", function(){
	if(lowerSquare2.className == "square out"){
	  lowerSquare2Text.className = "squareText textOpaque";
	}else{
	  lowerSquare2Text.className = "squareText";
	}
},true);	
