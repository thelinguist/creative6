function onLoad() {
    // console.log(document.getElementById("message"));
    var message = document.getElementById("message").innerHTML;
    if (message) {
        alert(message);
    }
}

function createGame() {
    var value =
        "<input type=\"text\" name=\"game\" placeholder=\"What would you like to call your game?\"/>\n" +
        "<input type=\"submit\" formmethod=\"post\" formaction=\"/create\" value=\"create game\"/>\n" +
        "<input type=\"submit\" onclick=\"setForm()\" value=\"cancel\">";
    document.getElementById("chooseAction").innerHTML = value;
}

function joinGame() {
    var value =
        "<input type=\"submit\" formmethod=\"post\" formaction=\"/join\" value=\"join current game\"/>\n" +
        "<input type=\"submit\" onclick=\"joinNewGame()\" value=\"join new game\" />";
    document.getElementById("chooseAction").innerHTML = value;
}

function joinNewGame() {
    var value =
        "<input type=\"text\" name=\"game\" placeholder=\"What game would you like to join?\"/>\n" +
        "<input type=\"submit\" formmethod=\"post\" formaction=\"/create\" value=\"join game\"/>\n" +
        "<input type=\"submit\" onclick=\"setForm()\" value=\"cancel\">";
    document.getElementById("chooseAction").innerHTML = value;
}

function setForm() {
    var value =
        "<input type=\"submit\" onclick=\"joinGame()\" value=\"Join Game\"/>\n" +
        "<input type=\"submit\" onclick=\"createGame()\" value=\"Create New Game\"/>";
    document.getElementById("chooseAction").innerHTML = value;
}
