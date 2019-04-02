function findResult(){
    var xmlhttp;
    var classes = document.getElementsByClassName("class");
    var b = "";
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {


            //console.log(xmlhttp.responseText);
            if (xmlhttp.responseText != "") {
                var x = JSON.parse(xmlhttp.responseText).project;
                console.log(x);
            }

            var yes = document.getElementById("yes");
            var no = document.getElementById("no");
            if (x != "") {
                no.style.display = "none";
                yes.style.display = "block";

               // classes[0].innerHTML = x[0].choose;
                  for(var i = 0; i <classes.length; i++){
                      if(typeof(x[i]) != "undefined"){
                          classes[i].innerHTML = x[i].choose;
                      }else{
                          classes[i].innerHTML = "";
                      }
                  }
            } else {
                yes.style.display = "none";
                no.style.display = "block";
            }


        }
        ;
    };
    xmlhttp.open("post","http://127.0.0.1:3008/",true);
    xmlhttp.send("classname=" + b);
}