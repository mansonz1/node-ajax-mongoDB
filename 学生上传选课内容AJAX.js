function upload(){
    var xmlhttp;
    var span = document.getElementsByClassName("span");
    var b = "";
    var str = document.getElementsByTagName("input");


    var objArray = str.length; //6

    for(var i=0;i<objArray;i++){//?????
        if(str[i].checked){
            b += span[i].innerHTML + ",";
        }
    }
    console.log(b);
    //去掉b最后多余的一个“，”

    var choose = b.substring(0,b.length-1).split(",");

    //console.log(typeof(choose));

    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange =function(){
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
    xmlhttp.open("post","http://127.0.0.1:3003/",true);
    xmlhttp.send("choose="+ choose + "&key=" + 7);
}
