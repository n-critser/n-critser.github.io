 <!-- hide script from old browsers
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

for (var i =0; i<frags.length; i++){
    document.write(frags[i]);
}
document.write( todos[0]);

// end hiding script from old browsers
-->