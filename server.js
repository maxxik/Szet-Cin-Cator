var http = require('http');

var fs = require('fs');

var url = require('url');

var currentDirection = 0;                           //The current direction of the SnaKee

var snakeKeys = [];
var snakeNames = [];


function onRequest(request, response) 
{
    response.writeHead(200, {'Content-Type': 'text/html'});

    var path = url.parse(request.url).pathname;     //http://asd.na/PATH

    var query = url.parse(request.url).query;       //http://asd.na/path?QUERY
    
    switch(path)
    {
        case '/':                                   //If index.html is requested send it back
            sendFile('./index.html', response);
            break;

        case '/play':                               //If the SnaKee game's html file is requested
            sendFile('./snake.html', response);
            break;

        case '/directionUpdate':                    //If it's a direction update
            var res = query.split("&");
            var dir = res[0].split("=")[1];         //Get the passed direction data
            var key = res[1].split("=")[1];         //Get the passed key
            var name = res[2].split("=")[1];        //Get the passed name

            console.log('dir: ' + dir);
            console.log('key: ' + key);
            console.log('name: ' + key);

            snakeKeys[key] = dir;                   //Put it to the global var
            snakeNames[key] = name;

            response.write('OK');                   //Yeah
            response.end();
            break;


        case '/directionGet':                       //If direction is requested
            //console.log('directionGet');
            var res = query.split("=");             //Get the passed key
            var key = res[1]; 
            response.write(String(snakeKeys[key])+'&'+snakeNames[key]); //Send it back
            response.end();
            break;
        
        case '/getSnakesCount':                     //If snake's count is needed
            //console.log('getSnakesCount');
            response.write(String(snakeKeys.length)); //Send it back
            response.end();
            break;


        default:
            console.log("Not an usual request... : " + path);
            sendFile('.' + path, response);
            break;
    }
}

http.createServer(onRequest).listen(8000);

function sendFile(path, response)
{
    fs.readFile(path, null, function(error, data)
        {
            if (error)
            {
                response.writeHead(404);
                response.write('File not found!');
                response.end();
            }
            else
            {
                if(path == './navigator.js')
                data=String(data).replace("KEYVALUE", String(generateSnakeKey()));
                response.write(data);
                response.end();
            }
        });
}

function generateSnakeKey()
{
    console.log('snakeKeys length: ' + snakeKeys.length);
    snakeKeys[snakeKeys.length] = 0;
    return snakeKeys.length-1;
}