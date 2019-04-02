function loadXMLDoc(){
    var xmlhttp;
    var main = document.getElementById("main");
    var b = "";
    var str = document.getElementsByClassName("classA");

    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var x = JSON.parse(xmlhttp.responseText).project;
            for(var i = 0; i <x.length; i++){
                var input = document.createElement("input");
                var span = document.createElement("span");
                main.appendChild(span);
                span.before(input);
                span.className += "span";
                input.setAttribute("type","checkbox");
                input.className += "boxA";
                var inputX = document.getElementsByTagName("input");
                var spanX = document.getElementsByTagName("span");
                if(typeof(x[i]) != "undefined"){
                    spanX[i].innerHTML = x[i].className;
                }else{
                    spanX[i].innerHTML = "";
                }
            }
        }
    };
    xmlhttp.open("post","http://127.0.0.1:3002/",true);
    xmlhttp.send("className="+ b);
}
