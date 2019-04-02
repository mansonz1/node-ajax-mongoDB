var box = document.getElementById("box");

var confirm = document.getElementById("confirm");

function cancle(){
    confirm.style.display = "none"
}

function firstSubmit(){
    confirm.style.display = "block";
}

function reset(){
    window.location.reload();
}