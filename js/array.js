function go(){
    var array = new Array();
    array[0] = "Red";
    array[1] = "Blue";
    array[3] = "Green";

    li = document.getElementById("list");
    li_arr = "";
    for (var i=0; i < array.length; i++){
	li_arr += "<li>" + array[i] + "</li>";
    }
    li.innerHtml = li_arr;
   
}