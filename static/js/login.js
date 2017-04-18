function onLoad() {
    console.log(document.getElementById("message"));
    var message = document.getElementById("message").innerHTML;
    if (message !== "/") {
        alert(message);
    }
}
