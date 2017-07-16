var upperSquare1 =  document.getElementById("upperSquare1");
var upperSquare2 =  document.getElementById("upperSquare2");
var upperSquare3 =  document.getElementById("upperSquare3");

var middleSquare1 = document.getElementById("middleSquare1");
var middleSquare2 = document.getElementById("middleSquare2");
var middleSquare3 = document.getElementById("middleSquare3");

var lowerSquare1 =  document.getElementById("lowerSquare1");
var lowerSquare2 =  document.getElementById("lowerSquare2");
var lowerSquare3 =  document.getElementById("lowerSquare3");



window.onload = function(){
	upperSquare1.className =  "inside";
	middleSquare1.className = "inside";
	lowerSquare1.className =  "inside";
};


upperSquare1.addEventListener("click",function(){
	if(upperSquare2.className == "out"){
		upperSquare2.className = "in";
		upperSquare3.className = "in";
	}else{
		upperSquare2.className = "out";
		upperSquare3.className = "out";
	}
},false);


middleSquare1.addEventListener("click",function(){
	if(middleSquare2.className == "out"){
		middleSquare2.className = "in";
		middleSquare3.className = "in";
	}else{
		middleSquare2.className = "out";
		middleSquare3.className = "out";
	}
},false);


lowerSquare1.addEventListener("click",function(){
	if(lowerSquare2.className == "out"){
		lowerSquare2.className = "in";
		lowerSquare3.className = "in";
	}else{
		lowerSquare2.className = "out";
		lowerSquare3.className = "out";
	}
},false);
