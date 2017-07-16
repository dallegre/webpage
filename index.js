var upperSquare1 =  document.getElementById("upperSquare1");
var upperSquare2 =  document.getElementById("upperSquare2");
var upperSquare3 =  document.getElementById("upperSquare3");
var upperSquare4 =  document.getElementById("upperSquare4");

var middleSquare1 = document.getElementById("middleSquare1");
var middleSquare2 = document.getElementById("middleSquare2");
var middleSquare3 = document.getElementById("middleSquare3");

var lowerSquare1 =  document.getElementById("lowerSquare1");
var lowerSquare2 =  document.getElementById("lowerSquare2");
var lowerSquare3 =  document.getElementById("lowerSquare3");

var upperSquare1Text =  document.getElementById("upperSquare1Text");
var upperSquare2Text =  document.getElementById("upperSquare2Text");
var upperSquare3Text =  document.getElementById("upperSquare3Text");
var upperSquare4Text =  document.getElementById("upperSquare4Text");
var middleSquare1Text = document.getElementById("middleSquare1Text");
var middleSquare2Text = document.getElementById("middleSquare2Text");
var middleSquare3Text = document.getElementById("middleSquare3Text");
var lowerSquare1Text =  document.getElementById("lowerSquare1Text");
var lowerSquare2Text =  document.getElementById("lowerSquare2Text");

var textstuff =   document.getElementById("textstuff");
var textstuff2 =  document.getElementById("textstuff2");

//Initial page loading stuff.  First make the squares go to the center of the window
window.onload = function(){
	upperSquare1.className =  "inside";
	middleSquare1.className = "inside";
	lowerSquare1.className =  "inside";
};
//Then make the labels show up on the suqares.
upperSquare1.addEventListener("transitionend", function(){
	upperSquare1Text.className = "opaque";
	middleSquare1Text.className = "opaque";
	lowerSquare1Text.className = "opaque";
	textstuff.className = "opaque";
	textstuff2.className = "opaque";
},true);
textstuff.addEventListener("transitionend", function(){
	//textstuff2.className = "opaque";
},true);

//Now handle the mouse clicks.
upperSquare1.addEventListener("click",function(){
	if(upperSquare2.className == "out"){
		upperSquare2.className = "in";
		upperSquare3.className = "in";
		upperSquare4.className = "in";
	}else{
		upperSquare2.className = "out";
		upperSquare3.className = "out";
		upperSquare4.className = "out";
	}
},false);
//After a click and transition, make the text appear on the submenu squares.
upperSquare2.addEventListener("transitionend", function(){
	if(upperSquare2.className == "out"){
	  upperSquare2Text.className = "opaque";
	  upperSquare3Text.className = "opaque";
	  upperSquare4Text.className = "opaque";
	}else{
	  upperSquare2Text.className = "transparent";
	  upperSquare3Text.className = "transparent";	
	  upperSquare4Text.className = "transparent";	
	}
},true);	


middleSquare1.addEventListener("click",function(){
	if(middleSquare2.className == "out"){
		middleSquare2.className = "in";
		middleSquare3.className = "in";
	}else{
		middleSquare2.className = "out";
		middleSquare3.className = "out";
	}
},false);
middleSquare2.addEventListener("transitionend", function(){
	if(middleSquare2.className == "out"){
	  middleSquare2Text.className = "opaque";
	  middleSquare3Text.className = "opaque";
	}else{
	  middleSquare2Text.className = "transparent";
	  middleSquare3Text.className = "transparent";	
	}
},true);	


lowerSquare1.addEventListener("click",function(){
	if(lowerSquare2.className == "out"){
		lowerSquare2.className = "in";
		lowerSquare3.className = "in";
	}else{
		lowerSquare2.className = "out";
		lowerSquare3.className = "out";
	}
},false);
lowerSquare2.addEventListener("transitionend", function(){
	if(lowerSquare2.className == "out"){
	  lowerSquare2Text.className = "opaque";
	}else{
	  lowerSquare2Text.className = "transparent";
	}
},true);	
