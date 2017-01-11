var name = prompt("Choose a name!");
document.addEventListener("keydown", onKeyPress);

function onClick(dir) 
{
    httpGetReq("./directionUpdate", dir);
}

function httpGetReq(theUrl, data)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl + '?' + 'data=' + data + '&key=' + 'KEYVALUE' + '&name=' + name, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function onKeyPress(event) {
x = event.which || event.keyCode;
    var dir = 0;
console.log(x);
    if (x == 37) {
        dir = 2;
    }
    else if (x == 38) {
        dir = 1;
    }
    else if (x == 39) {
        dir = 3;
    }
    else if (x == 40) {
        dir = 4;
    }
    if(dir != 0)
    {
        httpGetReq("./directionUpdate", dir);
    }

}
