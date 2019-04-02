
function loadXMLDoc(){
    console.log(123);
    var classId = document.getElementById("classId").value;
    var className = document.getElementById("className").value;
    var count = document.getElementById("count").value;

    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

            var success = document.getElementById("success");
            var confirm = document.getElementById("confirm");
            var alert = document.getElementById("alert");

            console.log(xmlhttp.responseText);

            confirm.style.display = "none";
            success.style.display = "block";

            alert.innerHTML = xmlhttp.responseText;

            alert.onclick = function(){
                window.location.reload();
            }
        }
    };
    xmlhttp.open("post","http://127.0.0.1:3001/",true);
    xmlhttp.send("classId=" + classId + "&className=" + className + "&count=" + count +"&key=" + 1);
}