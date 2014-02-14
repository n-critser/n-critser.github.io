 <!--//great tutorials
//http://www.yourhtmlsource.com/javascript/objectsproperties.html hide script from old browsers
document.write('<FONT COLOR=green>This is flip.js</FONT>')

var age= 25;
var introText = "A long, long time ago...";
document.write(introText + "I was  " + age);

var todos = new Array();
todos[0] = "TODO:";
todos[1] = "CHECKOUT:";
todos[2] = "BUG:";

var str = "Contact me at nick@nickcritser.com"
var frags = new Array();
frags = str.split(' ');

if ((frags != 0) || (str.length() < 5)){
    document.write(frags[3]);
}

function addNumbers(a,b){
    var c = a+b;
    return c;
}


for (var i =0; i<frags.length; i++){
    document.write(frags[i]+ '*');
}
document.write( " Addnumbers = " + addNumbers(4,4) + " "+ "todo:"+ (todos[0]));



var revert = new Array();
var inames = new Array('smirk');

// Preload
if (document.images) {
  var flipped = new Array();
  for(i=0; i< inames.length; i++) {
    flipped[i] = new Image();
    flipped[i].src = "assets/"+inames[i]+"2.gif";
  }
}

function over(num) {
  if(document.images) {
    revert[num] = document.images[inames[num]].src;
    document.images[inames[num]].src = flipped[num].src;
  }
}
function out(num) {
  if(document.images) document.images[inames[num]].src = revert[num];
}
// end hiding script from old browsers
-->