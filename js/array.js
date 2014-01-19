function go(element){
    var array = new Array();
    array[0] = "Red";
    array[1] = "Blue";
    array[3] = "Green";

    var ul = document.createElement("ul");
    for (var i=0; i < array.length; i++){
	var li = document.createElement("li");
	li.innerHtml = array[i];
	ul.appendChild(li);
    }
    body.insertAfter(ul, element);
}