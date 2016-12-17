var name = prompt("Choose a name!");
document.addEventListener("keypress", OnKeyPress);

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

function OnKeyPress (event) {
            var keyCode = ('charCode' in event) ? event.charCode : event.keyCode;

            if (keyCode === 38) {
                onClick(1)
            } else if (keyCode === 40) {
                onClick(4)
            } else if (keyCode === 39) {
                onClick(3)
            } else if (keyCode === 37) {
                onClick(2)
            }
        }