function onLoad() {
    console.log(document.getElementById("message"));
    var message = document.getElementById("message").value;
    if (message !== "/") {
        alert(message);
    }
}
